import * as THREE from "../../build/three.module.js";
import * as utils from "../../libs/util/util.js";
import { OrbitControls } from "../../build/jsm/controls/OrbitControls.js";

// import { SimulationScene } from "./simulation.js";
import { InspectionAircraft } from "../entities/inspection-aircraft.js";
import { ControlsSystem } from "../systems/controls.js";
import { ModeSystem } from "../systems/mode.js";
import { MovingPartsSystem } from "../systems/moving-parts.js";

class InspectionScene {
  constructor(renderer) {
    this.scene = new THREE.Scene();

    const ratio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 1000);
    this.camera.position.z = 20;

    const aircraft = new InspectionAircraft();

    this.scene.add(this.camera);
    this.scene.add(aircraft.object);

    utils.initDefaultBasicLight(this.scene, true);

    this.systems = [
      new ControlsSystem(aircraft),
      new MovingPartsSystem(aircraft),
      new ModeSystem(null /*new SimulationScene(this)*/),
    ];

    new OrbitControls(this.camera, renderer.domElement);
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
