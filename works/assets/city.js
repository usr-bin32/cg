import * as THREE from "../../build/three.module.js";

import * as buildings from "./buildings.js";

const Block = () => {
  const object = new THREE.Object3D();
  object.add(sectorA());

  object.add(pavementA());
  object.add(pavementB());
  object.add(pavementC());

  object.translateX(-160 / 2);

  return object;
};

function sectorA() {
  const object = new THREE.Object3D();

  var building = buildings.BuildingC();
  building.translateX(12 + 20);
  building.translateZ(12 + 20);
  object.add(building);

  var building = buildings.BuildingF();
  building.translateX(53 + 10);
  building.translateZ(12 + 20);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingF();
  building.translateX(53 + 10);
  building.translateZ(12 + 20);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingE();
  building.translateX(12 + 10);
  building.translateZ(53 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingD();
  building.translateX(12 + 10);
  building.translateZ(74 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingA();
  building.translateX(12 + 10);
  building.translateZ(95 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingA();
  building.translateX(12 + 10);
  building.translateZ(128 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingB();
  building.translateX(32 + 10);
  building.translateZ(128 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingB();
  building.translateX(53 + 10);
  building.translateZ(53 + 10);
  building.rotateY(-Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingA();
  building.translateX(53 + 10);
  building.translateZ(74 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  return object;
}

function pavementA() {
  const geometry = new THREE.BoxBufferGeometry(65, 0.2, 140);
  const material = new THREE.MeshLambertMaterial({ color: "slategray" });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.translateX(65 / 2);
  mesh.translateZ(140 / 2);
  mesh.translateY(0.1);

  mesh.translateX(10);
  mesh.translateZ(10);

  return mesh;
}

function pavementB() {
  const geometry = new THREE.BoxBufferGeometry(65, 0.2, 65);
  const material = new THREE.MeshLambertMaterial({ color: "slategray" });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.translateX(65 / 2);
  mesh.translateZ(65 / 2);
  mesh.translateY(0.1);

  mesh.translateX(85);
  mesh.translateZ(10);

  return mesh;
}

function pavementC() {
  const geometry = new THREE.BoxBufferGeometry(65, 0.2, 65);
  const material = new THREE.MeshLambertMaterial({ color: "slategray" });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.translateX(65 / 2);
  mesh.translateZ(65 / 2);
  mesh.translateY(0.1);

  mesh.translateX(85);
  mesh.translateZ(85);

  return mesh;
}

export { Block };
