import * as THREE from "../../../build/three.module.js";

import * as utils from "../../../libs/util/util.js";
import { GameState } from "../World.js";
import { MovingPartsSystem } from "../systems/MovingPartsSystem.js";
import { ControlsSystem } from "../systems/ControlsSystem.js";
import { ModeSystem } from "../systems/ModeSystem.js";
import { PhysicsSystem } from "../systems/PhysicsSystem.js";
import { SimulationAircraft } from "../entities/SimulationAircraft.js";

export const SimulationState = {
  build: function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.rotation.y = -Math.PI / 2;
    camera.position.y = 2.5;
    camera.position.x = -20;

    const cameraHolder = new THREE.Object3D();
    cameraHolder.add(camera);

    const aircraft = SimulationAircraft.build();

    aircraft.object.position.set(0, 5, 0);
    aircraft.object.add(cameraHolder);

    scene.add(aircraft.object);
    scene.add(utils.createGroundPlaneWired(10000, 10000, 100, 100));
    utils.initDefaultBasicLight(scene, true);

    const state = new GameState(
      scene,
      camera,
      [
        new ControlsSystem(),
        new MovingPartsSystem(),
        new PhysicsSystem(),
        new ModeSystem(),
      ],
      [aircraft]
    );

    return state;
  },
};
