import * as THREE from "../build/three.module.js";
import KeyboardState from "../libs/util/KeyboardState.js";

import { InspectionState } from "./engine/states/InspectionState.js";
import { World } from "./engine/World.js";
import * as utils from "../libs/util/util.js";


function main() {
  const clock = new THREE.Clock();
  const input = new KeyboardState();

  // Initialize renderer.
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
  });
  renderer.setClearColor(0x6989d6, 1);
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Initialize world and its state.
  const initialState = InspectionState.build(renderer);
  const world = new World(initialState, input);

  window.addEventListener("resize", function () {
    utils.onWindowResize(world.camera, renderer);
  });

  // Start and render.
  function render(time) {
    input.update();
    world.update(clock.getDelta());

    renderer.render(world.scene, world.camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
