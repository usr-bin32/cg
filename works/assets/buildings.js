import * as THREE from "../../build/three.module.js";

const BuildingA = () => {
  const geometry = new THREE.BoxBufferGeometry(40, 20, 20);
  const material = new THREE.MeshPhongMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  mesh.translateY(10);

  return mesh;
};

const BuildingB = () => {
  const geometry = new THREE.BoxBufferGeometry(2, 2, 4);
  const material = new THREE.MeshPhongMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  mesh.scale.set(15, 15, 15);
  mesh.translateY(15);

  return mesh;
};

export { BuildingA };
