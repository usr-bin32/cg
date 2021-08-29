class ModeSystem {
  constructor(nextScene) {
    this.nextScene = nextScene;
  }

  update(world) {
    if (world.input.down("space")) {
      world.scene = this.nextScene;
      world.scene.activate();
    }
  }
}

export { ModeSystem };
