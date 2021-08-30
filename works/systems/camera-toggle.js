class CameraState {
  constructor() {
    this.cockpit = false;
  }
}

class CameraToggleSystem {
  constructor(entity) {
    this.entity = entity;
  }

  update(world) {
    if (world.input.down("C")) {
      const cameraHolder = world.scene.getObjectByName("cameraHolder");
      const camera = cameraHolder.children[0];
      const cameraState = this.entity.cameraState;

      cameraState.cockpit = !cameraState.cockpit;
      if (cameraState.cockpit) {
        cameraHolder.position.set(22.3, 0, 0);
        camera.position.y = 0.75;
      } else {
        cameraHolder.position.set(0, 0, 0);
        camera.position.y = 2.5;
      }
    }
  }
}

export { CameraState, CameraToggleSystem };
