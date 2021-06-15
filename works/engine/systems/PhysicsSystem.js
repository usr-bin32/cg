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
            physics.angularVelocity.x = -2.5 * controls.roll;
            physics.angularVelocity.y = -controls.yaw / 4;
            physics.angularVelocity.z = -controls.pitch / 2;
        }

        const aircraft = object.children[0];
        const camera = object.children[2];

        aircraft.rotateX(physics.angularVelocity.x * dt);
        aircraft.rotateY(physics.angularVelocity.y * dt);
        aircraft.rotateZ(physics.angularVelocity.z * dt);

        // Infer angles from the direction vector.
        const cartesianDirection = new THREE.Vector3(1, 0, 0).applyEuler(
            aircraft.rotation
        );
        const sphericalDirection = new THREE.Spherical();
        sphericalDirection.setFromVector3(cartesianDirection);
        sphericalDirection.phi -= Math.PI / 2;
        sphericalDirection.theta -= Math.PI / 2;

        camera.rotation.y = sphericalDirection.theta;
        camera.rotation.z = -sphericalDirection.phi;

        // Translation
        object.position.add(
            physics.velocity
                .clone()
                .applyEuler(aircraft.rotation)
                .multiplyScalar(dt)
        );
    }
}
