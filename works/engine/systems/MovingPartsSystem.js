export class MovingPartsSystem {
  update(entity, world, dt) {
    if (!entity.movingParts || !entity.controls) {
      return;
    }

    const movingParts = entity.movingParts;
    const controls = entity.controls;

    movingParts.leftElevon.rotation.x =
      0.225 * (1.25 * controls.pitch - 1 * controls.roll);
    movingParts.rightElevon.rotation.x =
      0.225 * (1.25 * controls.pitch + 1 * controls.roll);
    movingParts.rudder.rotation.y = controls.yaw * 0.2;
  }
}
