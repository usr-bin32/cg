import * as THREE from "../../build/three.module.js";
import * as utils from "../../libs/util/util.js";
import { OrbitControls } from "../../build/jsm/controls/OrbitControls.js";

import { SimulationScene } from "./simulation.js";
import { InspectionAircraft } from "../engine/entities/inspection-aircraft.js";
import { ControlsSystem } from "../systems/controls.js";
import { ModeSystem } from "../systems/mode.js";
import { MovingPartsSystem } from "../systems/moving-parts.js";

class InspectionScene {
  constructor(renderer) {
    this.scene = new THREE.Scene();

    const ratio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
    this.camera.position.z = 20;

    const aircraft = InspectionAircraft.build();

    scene.add(camera);
    scene.add(aircraft.object);

    utils.initDefaultBasicLight(scene, true);

    this.systems = [
      new MovingPartsSystem(aircraft),
      new ControlsSystem(aircraft),
      new ModeSystem(new SimulationScene(this)),
    ];

    new OrbitControls(camera, renderer.domElement);
  }

  activate() {
    document.getElementById("info").style.display = "none";
  }

  update(world, dt) {
    for (const system of this.systems) {
      system.update(world, dt);
    }
  }
}

export { InspectionScene };
