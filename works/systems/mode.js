import * as utils from "../../libs/util/util.js";

class ModeSystem {
  constructor(nextScene) {
    this.nextScene = nextScene;
  }

  update(world) {
    if (world.input.down("space")) {
      world.scene = this.nextScene;
      world.scene.activate();
      utils.onWindowResize(world.scene.camera, world.renderer);
    }
  }
}

export { ModeSystem };
