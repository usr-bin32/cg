import * as THREE from "../../../build/three.module.js";

const MIN_VEL = 100;

export class PhysicsSystem {
    update(entity, world, dt) {
        if (!entity.physics || !entity.object) {
            return;
        }

        const object = entity.object;
        const physics = entity.physics;

        if (entity.controls) {
            const controls = entity.controls;

            const factor = Math.pow(Math.min(physics.velocity.x, MIN_VEL) / MIN_VEL, 8);
            physics.angularVelocity.x = controls.roll * 2.75 * factor * factor;
            physics.angularVelocity.y = controls.yaw * 2 * factor;
            physics.angularVelocity.z = controls.pitch * 0.6 * factor;

            // Make velocity more perceivable.
            const scaleFactor = 2.5;
            const targetVelocity =
                (controls.throttle - Math.abs(controls.yaw)) * 555 * scaleFactor;

            physics.acceleration.x =
                (targetVelocity - physics.velocity.x) / 750;
            if (physics.velocity.x < MIN_VEL) {
                physics.acceleration.x /= 10;
            }
        }

        physics.velocity.x += physics.acceleration.x;
        if (physics.velocity.x < 0) {
            physics.velocity.x = 0;
        }

        const aircraft = object.children[0];
        const camera = object.children[2];

        aircraft.rotateX(physics.angularVelocity.x * dt);
        // TODO: fix upside down movement
        object.rotation.y += physics.angularVelocity.y * dt;
        object.rotation.z += physics.angularVelocity.z * dt;

        if (object.rotation.z > Math.PI) {
            object.rotation.z -= 2 * Math.PI;
        } else if (object.rotation.z < -Math.PI) {
            object.rotation.z += 2 * Math.PI;
        }

        if (!entity.cameraState.cockpit) {
            // Camera counter-rotation
            camera.rotation.x = 0;
            camera.rotation.y = -physics.angularVelocity.y / 3;
            camera.rotation.z = -physics.angularVelocity.z / 15;
        } else {
            camera.rotation.x = aircraft.rotation.x;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
        }

        // Translation
        object.position.add(
            physics.velocity
                .clone()
                .applyEuler(object.rotation)
                .multiplyScalar(dt)
        );
    }
}
