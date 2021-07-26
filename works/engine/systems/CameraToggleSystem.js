export class CameraToggleSystem {
  update(entity, world, dt) {
    if (!entity.cameraState) {
      return;
    }

    if (world.input.down("C")) {
      console.log("DOWN");
      const cameraHolder = world.scene.getObjectByName("cameraHolder");
      const camera = cameraHolder.children[0];

      entity.cameraState.cockpit = !entity.cameraState.cockpit;
      if (entity.cameraState.cockpit) {
        cameraHolder.position.set(22.54, 0, 0);
        camera.position.y = 0.75;
      } else {
        cameraHolder.position.set(0, 0, 0);
        camera.position.y = 2.5;
      }
    }
  }
}