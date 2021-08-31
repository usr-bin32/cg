import * as THREE from "../../build/three.module.js";

const BuildingA = () => {
  var geometry = new THREE.BoxBufferGeometry(20, 15, 20);
  var material = new THREE.MeshPhongMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  mesh.translateY(7.5);

  return mesh;
};

const BuildingB = () => {
  var geometry = new THREE.BoxBufferGeometry(5, 30, 10);
  var material = new THREE.MeshPhongMaterial();
  const mesh1 = new THREE.Mesh(geometry, material);
  mesh1.translateY(15);

  var geometry = new THREE.BoxBufferGeometry(4.5, 15, 10);
  var material = new THREE.MeshPhongMaterial();
  const mesh2 = new THREE.Mesh(geometry, material);
  mesh2.translateY(7.5);
  mesh2.translateX(-4.5);

  var geometry = new THREE.CylinderBufferGeometry(5, 5, 10, 3);
  var material = new THREE.MeshPhongMaterial();
  const mesh3 = new THREE.Mesh(geometry, material);
  mesh3.translateX(-2.5);
  mesh3.translateY(15 + 2.5);
  mesh3.rotateX(-Math.PI / 2);

  const object = new THREE.Object3D();
  object.add(mesh1);
  object.add(mesh2);
  object.add(mesh3);

  object.translateZ(-4.5);

  object.scale.set(2, 1, 2);

  return object;
};

const BuildingC = () => {
  var geometry = new THREE.BoxBufferGeometry(40, 120, 40);
  var material = new THREE.MeshPhongMaterial();
  const mesh1 = new THREE.Mesh(geometry, material);
  mesh1.translateY(50);

  var geometry = new THREE.BoxBufferGeometry(35, 50, 35);
  var material = new THREE.MeshPhongMaterial();
  const mesh2 = new THREE.Mesh(geometry, material);
  mesh2.translateY(100 + 20);

  var geometry = new THREE.BoxBufferGeometry(20, 40, 20);
  var material = new THREE.MeshPhongMaterial();
  const mesh3 = new THREE.Mesh(geometry, material);
  mesh3.translateY(100 + 40 + 10);

  const object = new THREE.Object3D();
  object.add(mesh1);
  object.add(mesh2);
  object.add(mesh3);

  return object;
};

const BuildingD = () => {
  var geometry = new THREE.BoxBufferGeometry(20, 30, 20);
  var material = new THREE.MeshPhongMaterial();
  const mesh1 = new THREE.Mesh(geometry, material);
  mesh1.translateY(15);

  var geometry = new THREE.CylinderBufferGeometry(8, 8, 20, 3);
  var material = new THREE.MeshPhongMaterial();
  const mesh2 = new THREE.Mesh(geometry, material);
  mesh2.translateX(-3);
  mesh2.translateY(30);
  mesh2.rotateX(-Math.PI / 2);

  const object = new THREE.Object3D();
  object.add(mesh1);
  object.add(mesh2);
  object.add(mesh2);

  return object;
};

const BuildingE = () => {
  var geometry = new THREE.BoxBufferGeometry(20, 50, 20);
  var material = new THREE.MeshPhongMaterial();
  const mesh1 = new THREE.Mesh(geometry, material);
  mesh1.translateY(25);

  var geometry = new THREE.BoxBufferGeometry(10, 15, 20);
  var material = new THREE.MeshPhongMaterial();
  const mesh2 = new THREE.Mesh(geometry, material);
  mesh2.translateY(50 + 7.5);
  mesh2.translateX(5);

  const object = new THREE.Object3D();
  object.add(mesh1);
  object.add(mesh2);

  return object;
};

const BuildingF = () => {
  var geometry = new THREE.BoxBufferGeometry(40, 100, 20);
  var material = new THREE.MeshPhongMaterial();
  const mesh1 = new THREE.Mesh(geometry, material);
  mesh1.translateY(50);

  var geometry = new THREE.BoxBufferGeometry(35, 5, 15);
  var material = new THREE.MeshPhongMaterial();
  const mesh2 = new THREE.Mesh(geometry, material);
  mesh2.translateY(100 + 2.5);

  var geometry = new THREE.BoxBufferGeometry(40, 2, 20);
  var material = new THREE.MeshPhongMaterial();
  const mesh3 = new THREE.Mesh(geometry, material);
  mesh3.translateY(100 + 5 + 1);

  const object = new THREE.Object3D();
  object.add(mesh1);
  object.add(mesh2);
  object.add(mesh3);

  return object;
};

export { BuildingA, BuildingB, BuildingC, BuildingD, BuildingE, BuildingF };
