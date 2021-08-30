import * as THREE from "../../build/three.module.js";

const defaultMaterial = new THREE.MeshBasicMaterial({
  color: "orange",
  transparent: true,
  opacity: 0.5,
});

class Checkpoint {
  constructor(position, rotation) {
    const geometry = new THREE.TorusBufferGeometry(30, 1.5, 64, 64);
    this.object = new THREE.Mesh(geometry, defaultMaterial);

    this.object.position.copy(position);
    this.object.rotation.copy(rotation);

    this.bbox = new THREE.Box3().setFromObject(this.object);
  }
}

export { Checkpoint };
