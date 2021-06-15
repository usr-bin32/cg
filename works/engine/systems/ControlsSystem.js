const YAW_VELOCITY = 2;
const PITCH_VELOCITY = 3;
const ROLL_VELOCITY = 3;

export class ControlsSystem {
    update(entity, world, dt) {
        if (!entity.controls || !entity.object) {
            return;
        }
        const controls = entity.controls;
        const object = entity.object;
        const aircraft = object.children[0];
        
        if (world.input.down("1")) {
            controls.beginnerMode = !controls.beginnerMode;
        }

        if (controls.beginnerMode && aircraft) {
            // Pitch
            if (world.input.pressed("down")) {
                controls.pitch -= PITCH_VELOCITY * dt;
            } else if (world.input.pressed("up")) {
                controls.pitch += PITCH_VELOCITY * dt;
            } else {
                const targetPitch = aircraft.rotation.z * 5;

                if (Math.abs(controls.pitch - targetPitch) < 0.01) {
                    controls.pitch = targetPitch;
                } else {
                    if (controls.pitch > targetPitch) {
                        controls.pitch -= PITCH_VELOCITY * dt;
                    } else if (controls.pitch < targetPitch) {
                        controls.pitch += PITCH_VELOCITY * dt;
                    }
                }
            }

            // Roll
            const rollLimit = Math.PI / 2;
            if (world.input.pressed("left")) {
                const targetRoll = (aircraft.rotation.x + rollLimit);

                if (controls.roll < targetRoll) {
                    controls.roll += PITCH_VELOCITY * dt;
                } else if (controls.roll > targetRoll) {
                    controls.roll -= PITCH_VELOCITY * dt;
                }
            } else if (world.input.pressed("right")) {
                const targetRoll = (aircraft.rotation.x - rollLimit);

                if (controls.roll < targetRoll) {
                    controls.roll += PITCH_VELOCITY * dt;
                } else if (controls.roll > targetRoll) {
                    controls.roll -= PITCH_VELOCITY * dt;
                }
            } else {
                const targetRoll = aircraft.rotation.x * 1;

                if (Math.abs(controls.roll - targetRoll) < 0.01) {
                    controls.roll = targetRoll;
                } else {
                    if (controls.roll > targetRoll) {
                        controls.roll -= PITCH_VELOCITY * dt;
                    } else if (controls.roll < targetRoll) {
                        controls.roll += PITCH_VELOCITY * dt;
                    }
                }
            }
        } else {
            // Pitch
            if (world.input.pressed("down")) {
                controls.pitch -= PITCH_VELOCITY * dt;
            } else if (world.input.pressed("up")) {
                controls.pitch += PITCH_VELOCITY * dt;
            } else {
                if (controls.pitch > 0) {
                    controls.pitch -= PITCH_VELOCITY * dt;
                } else if (controls.pitch < 0) {
                    controls.pitch += PITCH_VELOCITY * dt;
                }
            }

            // Yaw
            if (world.input.pressed("A")) {
                controls.yaw += YAW_VELOCITY * dt;
            } else if (world.input.pressed("D")) {
                controls.yaw -= YAW_VELOCITY * dt;
            } else {
                if (controls.yaw > 0) {
                    controls.yaw -= YAW_VELOCITY * dt;
                } else if (controls.yaw < 0) {
                    controls.yaw += YAW_VELOCITY * dt;
                }
            }

            // Roll
            if (world.input.pressed("left")) {
                controls.roll += ROLL_VELOCITY * dt;
            } else if (world.input.pressed("right")) {
                controls.roll -= ROLL_VELOCITY * dt;
            } else {
                if (controls.roll > 0) {
                    controls.roll -= ROLL_VELOCITY * dt;
                } else if (controls.roll < 0) {
                    controls.roll += ROLL_VELOCITY * dt;
                }
            }
        }

        // Limit movement.
        if (controls.pitch > 1) {
            controls.pitch = 1;
        } else if (controls.pitch < -1) {
            controls.pitch = -1;
        }
        if (controls.yaw > 1) {
            controls.yaw = 1;
        } else if (controls.yaw < -1) {
            controls.yaw = -1;
        }
        if (controls.roll > 1) {
            controls.roll = 1;
        } else if (controls.roll < -1) {
            controls.roll = -1;
        }

        // Prevent stuttering.
        if (Math.abs(controls.pitch) < 0.01) {
            controls.pitch = 0;
        }
        if (Math.abs(controls.yaw) < 0.01) {
            controls.yaw = 0;
        }
        if (Math.abs(controls.roll) < 0.01) {
            controls.roll = 0;
        }
    }
}
