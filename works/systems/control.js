const MAX_VEL = 1;
const PITCH_ACC = 2;
const ROLL_ACC = 1.5;
const RUDDER_ACC = 1.5;

class Controls {
  constructor() {
    this.rudderYaw = 0;
    this.elevonPitch = 0;
    this.throttle = 0;

    this.pitch = 0;
    this.yaw = 0;
    this.roll = 0;
  }
}

class ControlsSystem {
  constructor(entity) {
    this.entity = entity;
  }

  update(world, dt) {
    const controls = this.entity.controls;
    const object = this.entity.object;
    const aircraft = object.children[0];

    // Throttle
    if (world.input.pressed("Q")) {
      controls.throttle = Math.min(1, controls.throttle + 0.5 * dt);
    } else if (world.input.pressed("A")) {
      controls.throttle = Math.max(0, controls.throttle - 0.5 * dt);
    }

    // Roll / Yaw
    const hasPitch = world.input.pressed("down") || world.input.pressed("up");
    const rollLimit = Math.PI / (hasPitch ? 4 : 2);
    if (world.input.pressed("right")) {
      const targetVel = (rollLimit - aircraft.rotation.x) / rollLimit;
      controls.roll = updateValue(controls.roll, targetVel, ROLL_ACC * dt);
    } else if (world.input.pressed("left")) {
      const targetVel = -(rollLimit + aircraft.rotation.x) / rollLimit;
      controls.roll = updateValue(controls.roll, targetVel, ROLL_ACC * dt);
    } else {
      const targetVel = (0 - aircraft.rotation.x) / rollLimit;
      controls.roll = updateValue(controls.roll, targetVel, ROLL_ACC * dt);
    }

    // Pitch
    if (world.input.pressed("down")) {
      const targetVel = Math.max(
        0,
        MAX_VEL - (1.1 * Math.abs(aircraft.rotation.x)) / (Math.PI / 2)
      );
      controls.pitch = updateValue(controls.pitch, targetVel, PITCH_ACC * dt);
    } else if (world.input.pressed("up")) {
      const targetVel = Math.min(
        0,
        -MAX_VEL + (1.1 * Math.abs(aircraft.rotation.x)) / (Math.PI / 2)
      );
      controls.pitch = updateValue(controls.pitch, targetVel, PITCH_ACC * dt);
    } else {
      let targetVel = -2 * object.rotation.z;
      if (targetVel < -MAX_VEL) {
        targetVel = -MAX_VEL;
      } else if (targetVel > MAX_VEL) {
        targetVel = MAX_VEL;
      }

      controls.pitch = updateValue(controls.pitch, targetVel, PITCH_ACC * dt);
    }

    // Rudder yaw.
    const maxRudderYaw = Math.PI / 2 - Math.abs(aircraft.rotation.x);
    if (world.input.pressed("Z")) {
      controls.rudderYaw = Math.min(
        maxRudderYaw,
        controls.rudderYaw + RUDDER_ACC * dt
      );
    } else if (world.input.pressed("X")) {
      controls.rudderYaw = Math.max(
        -maxRudderYaw,
        controls.rudderYaw - RUDDER_ACC * dt
      );
    } else {
      if (Math.abs(controls.rudderYaw) < 0.01) {
        controls.rudderYaw = 0;
      } else {
        if (controls.rudderYaw > 0) {
          controls.rudderYaw -= RUDDER_ACC * dt;
        } else if (controls.rudderYaw < 0) {
          controls.rudderYaw += RUDDER_ACC * dt;
        }
      }
    }

    controls.yaw = -aircraft.rotation.x / 8 - controls.rudderYaw / 20;
    controls.elevonPitch = -Math.abs(aircraft.rotation.x) + -controls.pitch;

    // Draw info.
    document.getElementById("throttle").innerText = `${(
      controls.throttle * 100
    ).toFixed(0)} %`;
  }
}

function updateValue(current, target, delta, tolerance = 0.02) {
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

export { Controls, ControlsSystem };
