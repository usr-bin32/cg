import * as THREE from "../build/three.module.js";
import * as utils from "../libs/util/util.js";

import { InspectionState } from "./scenes/inspection.js";
import { World } from "./world.js";

function main() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
  });

  renderer.setClearColor(0x6989d6, 1);
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener("resize", function () {
    utils.onWindowResize(world.scene.camera, renderer);
  });

  const world = new World(renderer, new InspectionState(renderer));

  function render() {
    world.update();
    renderer.render(world.scene, world.camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
