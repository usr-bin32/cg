import { OrbitControls } from "../../../build/jsm/controls/OrbitControls.js";
import * as THREE from "../../../build/three.module.js";

import * as utils from "../../../libs/util/util.js";
import { GameState } from "../World.js";
import { InspectionAircraft } from "../entities/InspectionAircraft.js";
import { MovingPartsSystem } from "../systems/MovingPartsSystem.js";
import { ControlsSystem } from "../systems/ControlsSystem.js";
import { ModeSystem } from "../systems/ModeSystem.js";

export const InspectionState = {
    build: function (renderer) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 20;

        const aircraft = InspectionAircraft.build();

        scene.add(aircraft.object);
        scene.add(camera);
        utils.initDefaultBasicLight(scene, true);

        const state = new GameState(
            scene,
            camera,
            [new ControlsSystem(), new MovingPartsSystem(), new ModeSystem()],
            [aircraft]
        );
        state.controls = new OrbitControls(camera, renderer.domElement);

        return state;
    },
};
