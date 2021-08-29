import * as THREE from "../../build/three.module.js";

import { GameState } from "../world.js";
import { MovingPartsSystem } from "../engine/systems/MovingPartsSystem.js";
import { ControlsSystem } from "../systems/controls.js";
import { ModeSystem } from "../engine/systems/mode.js";
import { PhysicsSystem } from "../engine/systems/PhysicsSystem.js";
import { SimulationAircraft } from "../engine/entities/SimulationAircraft.js";
import { CameraToggleSystem } from "../engine/systems/CameraToggleSystem.js";
import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import { Checkpoint } from "../engine/entities/Checkpoint.js";
import { CheckpointSystem } from "../engine/systems/CheckpointSystem.js";
import { PathToggleSystem } from "../engine/systems/PathToggleSystem.js";

const WORLD_SCALE = 1;
const checkpointData = [
  {
    position: new THREE.Vector3(
      1.842992734766871e-13,
      54.23904337146913,
      -1186.221159830944
    ),
    rotation: new THREE.Euler(0, 1.5707963267948966, 0.00677889348841733),
  },
];

class SimulationScene {
  constructor(nextScene) {
    {
      const scene = new THREE.Scene();

      const checkpoints = checkpointData.map((c) => {
        // Undo aircraft rotation.
        c.rotation.y -= 1.5707963267948966;
        const checkpoint = Checkpoint.build(c.position, c.rotation);
        scene.add(checkpoint.object);

        return checkpoint;
      });

      // Path
      const path = (() => {
        const ribbonBase = new THREE.CatmullRomCurve3(
          checkpointData.map((c) => c.position)
        );

        const hh = 0.0625 * 100;
        const hw = 0.001 * 500;
        const profile = new THREE.Shape([
          new THREE.Vector2(-hw, -hh),
          new THREE.Vector2(-hw, hh),
          new THREE.Vector2(hw, hh),
          new THREE.Vector2(hw, -hh),
          new THREE.Vector2(-hw, -hh),
        ]);

        const ribbonGeometry = new THREE.ExtrudeGeometry(profile, {
          steps: 800,
          bevelEnabled: false,
          extrudePath: ribbonBase,
        });
        const ribbonMaterial = new THREE.MeshBasicMaterial({
          color: "orange",
          transparent: true,
          opacity: 0.5,
          side: THREE.FrontSide,
        });

        const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
        ribbon.visible = false;
        scene.add(ribbon);

        return ribbon;
      })();

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
              treeGltf.scene.traverse((child) => {
                child.castShadow = true;
              });

              for (let i = 0; i < 500; i++) {
                const tree = treeGltf.scene.clone();

                const scale = Math.random() + 3;
                const dx = (Math.random() * 2 - 1) * 8;
                const dz = (Math.random() * 2 - 1) * 20 - 21.15;

                tree.scale.set(scale, scale, scale);
                tree.translateX(dx * WORLD_SCALE);
                tree.translateZ(dz * WORLD_SCALE);
                scene.add(tree);
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
          new CheckpointSystem(aircraft, checkpoints),
          new PathToggleSystem(path),
        ],
        [aircraft]
      );

      return state;
    }
  }
}

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
  sunLight.shadow.mapSize.width = 2048 * 2;
  sunLight.shadow.mapSize.height = 2048 * 2;

  const d = 500;
  sunLight.shadow.camera.visible = true;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  sunLight.shadow.camera.near = 0.1;
  sunLight.shadow.camera.far = 1000000;

  scene.add(ambientLight);
  scene.add(sunLight);
}

export { SimulationScene };
