export class MovingPartsSystem {
    update(entity, world, dt) {
        if (!entity.movingParts || !entity.controls) {
            return;
        }

        const movingParts = entity.movingParts;
        const controls = entity.controls;

        movingParts.leftElevon.rotation.x =
            0.225 * (1 * controls.elevonPitch + 1.2 * controls.roll);
        movingParts.rightElevon.rotation.x =
            0.225 * (1 * controls.elevonPitch - 1.2 * controls.roll);
        movingParts.rudder.rotation.y = controls.rudderYaw * 0.15;
    }
}
