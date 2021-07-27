import * as THREE from "../../../build/three.module.js";

import { GameState } from "../World.js";
import { MovingPartsSystem } from "../systems/MovingPartsSystem.js";
import { ControlsSystem } from "../systems/ControlsSystem.js";
import { ModeSystem } from "../systems/ModeSystem.js";
import { PhysicsSystem } from "../systems/PhysicsSystem.js";
import { SimulationAircraft } from "../entities/SimulationAircraft.js";
import { CameraToggleSystem } from "../systems/CameraToggleSystem.js";
import { GLTFLoader } from "../../../build/jsm/loaders/GLTFLoader.js";
import { createGroundPlane } from "../../../libs/util/util.js";

const SCALE = 500;

export const SimulationState = {
  build: function () {
    const scene = new THREE.Scene();
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

    aircraft.object.position.set(0, 2, 0);
    aircraft.object.rotation.set(0, Math.PI / 2, 0);
    aircraft.object.add(cameraHolder);
    scene.add(aircraft.object);

    (() => {
      const loader = new GLTFLoader();
      loader.load("engine/assets/mountains.glb", (gltf) => {
        gltf.scene.scale.set(SCALE, SCALE, SCALE);
        gltf.scene.traverse((child) => {
          child.receiveShadow = true;
        });

        scene.add(gltf.scene);
      });
    })();

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
  position = new THREE.Vector3(0, 50000, 75000)
) {
  const ambientLight = new THREE.HemisphereLight("white", "darkslategrey", 0.5);

  const sunLight = new THREE.DirectionalLight("white", 0.8);
  sunLight.position.copy(position);
  sunLight.target = target;
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048 * 4;
  sunLight.shadow.mapSize.height = 2048 * 4;

  sunLight.shadow.camera.visible = true;
  sunLight.shadow.camera.left = -100;
  sunLight.shadow.camera.right = 100;
  sunLight.shadow.camera.top = 100;
  sunLight.shadow.camera.bottom = -100;
  sunLight.shadow.camera.near = 0.1;
  sunLight.shadow.camera.far = 500000;

  scene.add(ambientLight);
  scene.add(sunLight);
}
