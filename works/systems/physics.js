import * as THREE from "../../build/three.module.js";

const MIN_VEL = 100;
const MAX_VEL = 555;

class Physics {
  constructor(velocity) {
    this.velocity = velocity;
    this.acceleration = new THREE.Vector3();
    this.angularVelocity = new THREE.Vector3();
  }
}

class PhysicsSystem {
  constructor(entity) {
    this.entity = entity;
  }

  update(_world, dt) {
    const object = this.entity.object;
    const physics = this.entity.physics;

    if (this.entity.controls) {
      const controls = this.entity.controls;

      const factor = Math.min(physics.velocity.x, MIN_VEL) / MIN_VEL;
      physics.angularVelocity.x = controls.roll * 4 * Math.pow(factor, 6);
      physics.angularVelocity.y = controls.yaw * 3 * Math.pow(factor, 0.5);
      physics.angularVelocity.z = controls.pitch * 0.6 * Math.pow(factor, 6);

      const targetVelocity =
        (controls.throttle - Math.abs(controls.yaw)) * MAX_VEL;

      physics.acceleration.x = (targetVelocity - physics.velocity.x) / 1600;
      if (physics.velocity.x < MIN_VEL && targetVelocity > 0) {
        physics.acceleration.x = (physics.velocity.x + 10) * ((MAX_VEL - MIN_VEL) / 1600) / MIN_VEL
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

    if (!this.entity.cameraState.cockpit) {
      // Camera counter-rotation
      camera.rotation.x = 0;
      camera.rotation.y = -physics.angularVelocity.y / 3;
      camera.rotation.z = -physics.angularVelocity.z / 15;
    } else {
      camera.rotation.x = aircraft.rotation.x;
      camera.rotation.y = 0;
      camera.rotation.z = 0;
    }

    // Checkpoint Builder
    // if (world.input.down("shift")) {
    //   console.log(
    //     `{ position: new THREE.Vector3(${object.position.x}, ${object.position.y}, ${object.position.z}), rotation: new THREE.Euler(${object.rotation.x}, ${object.rotation.y}, ${object.rotation.z}) },`
    //   );
    // }

    // Translation
    object.position.add(
      physics.velocity.clone().applyEuler(object.rotation).multiplyScalar(dt)
    );

    // Draw info.
    document.getElementById("speed").innerText = `${(
      physics.velocity.x * 3.6
    ).toFixed(0)} km/h`;
    document.getElementById("altitude").innerText = `${(
      object.position.y - 1.5
    ).toFixed(0)} m`;
  }
}

export { Physics, PhysicsSystem };
