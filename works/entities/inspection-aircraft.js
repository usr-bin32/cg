import * as THREE from "../../build/three.module.js";

import { Mirage } from "../assets/mirage.js";
import { Controls } from "../systems/control.js";
import { MovingParts } from "../systems/moving-parts.js";

class InspectionAircraft {
  constructor() {
    const aircraft = Mirage();

    this.object = new THREE.Object3D();
    this.object.add(aircraft);

    this.movingParts = new MovingParts(aircraft);
    this.controls = new Controls();
  }
}

export { InspectionAircraft };
