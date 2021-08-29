import * as THREE from "../../../build/three.module.js";

class Physics {
  constructor(velocity) {
    this.velocity = velocity;
    this.acceleration = new THREE.Vector3();
    this.angularVelocity = new THREE.Vector3();
  }
}

export { Physics };
