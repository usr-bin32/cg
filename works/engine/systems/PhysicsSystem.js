import * as THREE from "../../../build/three.module.js";

export class PhysicsSystem {
    update(entity, world, dt) {
        if (!entity.physics || !entity.object) {
            return;
        }

        const object = entity.object;
        const physics = entity.physics;

        if (entity.controls) {
            const controls = entity.controls;

            physics.angularVelocity.x = controls.roll * 2.75;
            physics.angularVelocity.y = controls.yaw * 1.25;
            physics.angularVelocity.z = controls.pitch * 0.6;

            const targetVelocity =
                (controls.throttle - Math.abs(controls.yaw)) * 555;
            physics.acceleration.x =
                (targetVelocity - physics.velocity.x) / 1400;
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

        // Camera counter-rotation
        camera.rotation.y = -physics.angularVelocity.y / 3;
        camera.rotation.z = -physics.angularVelocity.z / 15;

        // Translation
        object.position.add(
            physics.velocity
                .clone()
                .applyEuler(object.rotation)
                .multiplyScalar(dt)
        );
    }
}
