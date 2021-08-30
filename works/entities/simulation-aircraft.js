import * as THREE from "../../build/three.module.js";

import { Mirage } from "../assets/Mirage.js";
import { CameraState } from "../systems/camera-toggle.js";
import { Controls } from "../systems/control.js";
import { MovingParts } from "../systems/moving-parts.js";
import { Physics } from "../systems/physics.js";

class SimulationAircraft {
  constructor() {
    const aircraft = Mirage();
    const helper = new THREE.AxesHelper(15);
    helper.visible = false;

    this.object = new THREE.Object3D();
    this.object.add(aircraft);
    this.object.add(helper);

    this.movingParts = new MovingParts(aircraft);
    this.controls = new Controls();
    this.physics = new Physics(new THREE.Vector3(0, 0, 0));
    this.cameraState = new CameraState();
  }
}

export { SimulationAircraft };
