import * as THREE from "../../build/three.module.js";
import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";

import { Checkpoint } from "../entities/checkpoint.js";
import { SimulationAircraft } from "../entities/simulation-aircraft.js";
import { MovingPartsSystem } from "../systems/moving-part.js";
import { ControlsSystem } from "../systems/control.js";
import { ModeSystem } from "../systems/mode.js";
import { PhysicsSystem } from "../systems/physics.js";
import { CameraToggleSystem } from "../systems/camera-toggle.js";
import { CheckpointSystem } from "../systems/checkpoint.js";
import { PathToggleSystem } from "../systems/path-toggle.js";

const WORLD_SCALE = 500;
const checkpointData = [
  {
    position: new THREE.Vector3(
      1.842992734766871e-13,
      54.23904337146913,
      -1186.221159830944
    ),
    rotation: new THREE.Euler(0, 1.5707963267948966, 0.00677889348841733),
  },
  {
    position: new THREE.Vector3(
      10.842992734766871e-13,
      54.23904337146913,
      -1186.221159830944
    ),
    rotation: new THREE.Euler(0, 1.5707963267948966, 0.00677889348841733),
  },
];

class SimulationScene {
  constructor(nextScene) {
    const scene = new THREE.Scene();

    const checkpoints = checkpointData.map((c) => {
      // Undo aircraft rotation.
      c.rotation.y -= 1.5707963267948966;
      const checkpoint = new Checkpoint(c.position, c.rotation);
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
      loader.load("assets/tree1.glb", (treeGltf) => {
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

    const aircraft = new SimulationAircraft();
    aircraft.object.traverse((child) => {
      child.castShadow = true;
    });

    aircraft.object.position.set(0, 1.5, 0);
    aircraft.object.rotation.set(0, Math.PI / 2, 0);
    aircraft.object.add(cameraHolder);
    scene.add(aircraft.object);

    addLighting(scene, aircraft.object);

    this.scene = scene;
    this.camera = camera;
    this.systems = [
      new ControlsSystem(aircraft),
      new MovingPartsSystem(aircraft),
      new PhysicsSystem(aircraft),
      new CameraToggleSystem(aircraft),
      new CheckpointSystem(aircraft, checkpoints),
      new ModeSystem(nextScene),
    ];
  }

  activate() {
    document.getElementById("info").style.display = "inherit";
  }

  update(world, dt) {
    for (const system of this.systems) {
      system.update(world, dt);
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