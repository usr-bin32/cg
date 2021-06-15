import * as THREE from "../../../build/three.module.js";

const MAX_VEL = 1;
const PITCH_ACC = 2;
const ROLL_ACC = 1.5;

export class ControlsSystem {
    update(entity, world, dt) {
        if (!entity.controls || !entity.object) {
            return;
        }

        const controls = entity.controls;
        const object = entity.object;
        const aircraft = object.children[0];

        // Roll / Yaw
        const hasPitch =
            world.input.pressed("down") || world.input.pressed("up");
        const rollLimit = Math.PI / (hasPitch ? 4 : 2);
        if (world.input.pressed("right")) {
            const targetVel = (rollLimit - aircraft.rotation.x) / rollLimit;
            controls.roll = updateValue(
                controls.roll,
                targetVel,
                ROLL_ACC * dt
            );
        } else if (world.input.pressed("left")) {
            const targetVel = -(rollLimit + aircraft.rotation.x) / rollLimit;
            controls.roll = updateValue(
                controls.roll,
                targetVel,
                ROLL_ACC * dt
            );
        } else {
            const targetVel = (0 - aircraft.rotation.x) / rollLimit;
            controls.roll = updateValue(
                controls.roll,
                targetVel,
                ROLL_ACC * dt
            );
        }

        // Pitch
        if (world.input.pressed("down")) {
            const targetVel = Math.max(
                0,
                MAX_VEL - (1.2 * Math.abs(aircraft.rotation.x)) / (Math.PI / 2)
            );
            controls.pitch = updateValue(
                controls.pitch,
                targetVel,
                PITCH_ACC * dt
            );
        } else if (world.input.pressed("up")) {
            const targetVel = Math.min(
                0,
                -MAX_VEL + (1.2 * Math.abs(aircraft.rotation.x)) / (Math.PI / 2)
            );
            controls.pitch = updateValue(
                controls.pitch,
                targetVel,
                PITCH_ACC * dt
            );
        } else {
            const targetVel = -2 * object.rotation.z;
            controls.pitch = updateValue(controls.pitch, targetVel, PITCH_ACC * dt);
        }

        controls.yaw = -aircraft.rotation.x / 8;
        controls.elevonPitch = -Math.abs(aircraft.rotation.x) + -controls.pitch;
    }
}

function updateValue(current, target, delta, tolerance = 0.01) {
    if (Math.abs(current - target) > tolerance) {
        if (current < target) {
            return current + delta;
        } else if (current > target) {
            return current - delta;
        }
    } else {
        return target;
    }
}
