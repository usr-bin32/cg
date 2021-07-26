import * as THREE from "../../../build/three.module.js";

import { Mirage } from "../assets/Mirage.js";
import { CameraState } from "../components/CameraState.js";
import { Controls } from "../components/Controls.js";
import { MovingParts } from "../components/MovingParts.js";
import { Physics } from "../components/Physics.js";

export const SimulationAircraft = {
    build: function () {
        const aircraft = Mirage.build();
        const helper = new THREE.AxesHelper(15);
        helper.visible = false;

        const object = new THREE.Object3D();
        object.add(aircraft);
        object.add(helper);

        return {
            object,
            movingParts: new MovingParts(aircraft),
            controls: new Controls(),
            physics: new Physics(new THREE.Vector3(100, 0, 0)),
            cameraState: new CameraState()
        };
    },
};
