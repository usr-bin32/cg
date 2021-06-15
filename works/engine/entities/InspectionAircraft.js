import * as THREE from "../../../build/three.module.js";

import { Mirage } from "../assets/Mirage.js";
import { Controls } from "../components/Controls.js";
import { MovingParts } from "../components/MovingParts.js";

export const InspectionAircraft = {
  build: function () {
    const aircraft = Mirage.build();
    const object = new THREE.Object3D();
    object.add(aircraft);

    return {
      object,
      movingParts: new MovingParts(aircraft),
      controls: new Controls(),
    };
  },
};
