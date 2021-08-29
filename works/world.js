import * as THREE from "../build/three.module.js";
import KeyboardState from "../libs/util/KeyboardState.js";

class World {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.clock = new THREE.Clock();
    this.input = new KeyboardState();

    this.scene = scene;
  }

  update() {
    this.input.update();
    this.scene.update(this, this.clock.getDelta());
  }
}

export { World };
