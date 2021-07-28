export class ModeSystem {
  update(entity, world, dt) {
    if (world.input.down("space")) {
      world.setState(world.prevState);
      world.info = !world.info;
      document.getElementById("info").style.display = (!world.info) ? "none" : "inherit";
    }

    return false;
  }
}
