import * as THREE from "../../../build/three.module.js";

import { Mirage } from "../assets/Mirage.js";
import { Controls } from "../components/Controls.js";
import { MovingParts } from "../components/MovingParts.js";
import { Physics } from "../components/Physics.js";

export const SimulationAircraft = {
    build: function () {
        const aircraft = Mirage.build();

        const object = new THREE.Object3D();
        object.add(aircraft);
        object.add(new THREE.AxesHelper(15));

        return {
            object,
            movingParts: new MovingParts(aircraft),
            controls: new Controls(),
            physics: new Physics(new THREE.Vector3(30, 0, 0)),
        };
    },
};
