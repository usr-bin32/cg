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
        }

        const aircraft = object.children[0];
        const camera = object.children[2];

        aircraft.rotateX(physics.angularVelocity.x * dt);
        object.rotation.y += physics.angularVelocity.y * dt;
        object.rotation.z += physics.angularVelocity.z * dt;

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
