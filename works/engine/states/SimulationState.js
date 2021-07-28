import * as THREE from "../../../build/three.module.js";

import { GameState } from "../World.js";
import { MovingPartsSystem } from "../systems/MovingPartsSystem.js";
import { ControlsSystem } from "../systems/ControlsSystem.js";
import { ModeSystem } from "../systems/ModeSystem.js";
import { PhysicsSystem } from "../systems/PhysicsSystem.js";
import { SimulationAircraft } from "../entities/SimulationAircraft.js";
import { CameraToggleSystem } from "../systems/CameraToggleSystem.js";
import { GLTFLoader } from "../../../build/jsm/loaders/GLTFLoader.js";

const WORLD_SCALE = 500;

export const SimulationState = {
  build: function () {
    const scene = new THREE.Scene();

    (() => {
      const loader = new GLTFLoader();
      loader.load("engine/assets/mountains.glb", (terrainGltf) => {
        terrainGltf.scene.scale.set(WORLD_SCALE, WORLD_SCALE, WORLD_SCALE);
        terrainGltf.scene.traverse((child) => {
          child.receiveShadow = true;
        });
        scene.add(terrainGltf.scene);

        (() => {
          const loader = new GLTFLoader();
          loader.load("engine/assets/tree1.glb", (treeGltf) => {
            const raycaster = new THREE.Raycaster();

            treeGltf.scene.traverse((child) => {
              child.castShadow = true;
            });

            for (let i = 0; i < 1000; i++) {
              const tree = treeGltf.scene.clone();

              const scale = Math.random() + 3;
              const dx = (Math.random() * 2 - 1) * 15;
              const dz = ((Math.random() * 2 - 1) * 20 - 2.5);

              const obj = terrainGltf.scene.children[0].children[0];
              const rayOrigin = new THREE.Vector3(dx, -20, dz);
              const rayOrientation = new THREE.Vector3(0, 1, 0);

              raycaster.set(rayOrigin, rayOrientation);
              const intersections = raycaster.intersectObject(obj);

              if (intersections.length > 0) {
                tree.scale.set(scale, scale, scale);
                tree.translateX(dx * WORLD_SCALE);
                // TODO: Y detection
                tree.translateZ(dz * WORLD_SCALE);

                scene.add(tree);
              } else {
                i--;
              }
            }
          });
        })();
      });
    })();

    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      500000
    );
    camera.rotation.y = -Math.PI / 2;
    camera.position.y = 2.5;
    camera.position.x = -20;

    const cameraHolder = new THREE.Object3D();
    cameraHolder.name = "cameraHolder";
    cameraHolder.add(camera);

    const aircraft = SimulationAircraft.build();
    aircraft.object.traverse((child) => {
      child.castShadow = true;
    });

    aircraft.object.position.set(0, 1.5, 0);
    aircraft.object.rotation.set(0, Math.PI / 2, 0);
    aircraft.object.add(cameraHolder);
    scene.add(aircraft.object);

    addLighting(scene, aircraft.object);

    const state = new GameState(
      scene,
      camera,
      [
        new ControlsSystem(),
        new MovingPartsSystem(),
        new PhysicsSystem(),
        new ModeSystem(),
        new CameraToggleSystem(),
      ],
      [aircraft]
    );

    return state;
  },
};

function addLighting(
  scene,
  target,
  position = new THREE.Vector3(20000, 50000, 80000)
) {
  const ambientLight = new THREE.HemisphereLight("white", "darkslategrey", 0.5);

  const sunLight = new THREE.DirectionalLight("white", 0.8);
  sunLight.position.copy(position);
  sunLight.target = target;
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048 * 4;
  sunLight.shadow.mapSize.height = 2048 * 4;

  const d = 500;
  sunLight.shadow.camera.visible = true;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  sunLight.shadow.camera.near = 0.1;
  sunLight.shadow.camera.far = 100000;

  scene.add(ambientLight);
  scene.add(sunLight);
}
