export class ModeSystem {
  update(entity, world, dt) {
    if (!entity.movingParts || !entity.controls) {
      return;
    }

    if (world.input.down("space")) {
      if (world.prevState) {
        world.setState(world.prevState);
      }
    }
  }
}
