import * as THREE from "../../build/three.module.js";

import { Mirage } from "../assets/Mirage.js";
import { Controls } from "../systems/controls.js";
import { MovingParts } from "../systems/moving-parts";

class InspectionAircraft {
  constructor() {
    const aircraft = Mirage.build();

    this.object = new THREE.Object3D();
    this.object.add(aircraft);

    this.movingParts = new MovingParts(aircraft);
    this.controls = new Controls();
  }
}

export { InspectionAircraft };
