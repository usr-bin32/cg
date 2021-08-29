class MovingParts {
  constructor(object) {
    this.leftElevon = object.getObjectByName("leftElevon");
    this.rightElevon = object.getObjectByName("rightElevon");
    this.rudder = object.getObjectByName("rudder");
  }
}

class MovingPartsSystem {
  constructor(entity) {
    this.entity = entity;
  }

  update() {
    const movingParts = this.entity.movingParts;
    const controls = this.entity.controls;

    movingParts.leftElevon.rotation.x =
      0.225 * (1 * controls.elevonPitch + 1.2 * controls.roll);
    movingParts.rightElevon.rotation.x =
      0.225 * (1 * controls.elevonPitch - 1.2 * controls.roll);
    movingParts.rudder.rotation.y = controls.rudderYaw * 0.15;
  }
}

export { MovingParts, MovingPartsSystem };
