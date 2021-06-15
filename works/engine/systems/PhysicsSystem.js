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
      physics.angularVelocity.x = -2 * controls.roll;
      physics.angularVelocity.y = -controls.yaw / 4;
      physics.angularVelocity.z = -controls.pitch / 2;
    }

    const aircraft = object.children[0];
    // const helper = object.children[1];
    const camera = object.children[2];

    aircraft.rotateX(physics.angularVelocity.x * dt);
    aircraft.rotateY(physics.angularVelocity.y * dt);
    aircraft.rotateZ(physics.angularVelocity.z * dt);

    // Infer angles from direction vector.
    const cartesian = new THREE.Vector3(1, 0, 0).applyEuler(aircraft.rotation);
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(cartesian);
    spherical.phi -= Math.PI / 2;
    spherical.theta -= Math.PI / 2;

    camera.rotation.y = spherical.theta;
    camera.rotation.z = -spherical.phi;

    // Translation
    object.position.add(
      physics.velocity.clone().applyEuler(aircraft.rotation).multiplyScalar(dt)
    );
  }
}
