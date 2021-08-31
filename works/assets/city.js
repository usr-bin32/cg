import * as THREE from "../../build/three.module.js";

import * as buildings from "./buildings.js";

const City = (n) => {
  const t = n * n;

  const object = new THREE.Object3D();

  for (let i = 0; i < t; i += 1) {
    const col = i % n;
    const row = Math.floor(i / n);

    const block = Block();
    block.translateX(col * 160);
    block.translateZ(row * 160);
    block.rotateY((Math.PI * i * 3) / 2);

    object.add(block);
  }

  object.translateX(-160 * ((n - 1) / 2));
  object.translateZ(-160 * ((n - 1) / 2));

  object.traverse((node) => {
    node.castShadow = true;
    node.receiveShadow = true;
  });

  return object;
};

const Block = () => {
  const object = new THREE.Object3D();
  object.add(sectorA());
  object.add(sectorB());
  object.add(sectorC());

  object.add(pavementA());
  object.add(pavementB());
  object.add(pavementC());

  object.children.forEach((child) => {
    child.translateX(-160 / 2);
    child.translateZ(-160 / 2);
  });

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

function sectorB() {
  const object = new THREE.Object3D();

  var building = buildings.BuildingB();
  building.translateX(87 + 10);
  building.translateZ(12 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingA();
  building.translateX(107 + 10);
  building.translateZ(12 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingA();
  building.translateX(87 + 10);
  building.translateZ(53 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingD();
  building.translateX(87 + 10);
  building.translateZ(33 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingD();
  building.translateX(128 + 10);
  building.translateZ(12 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingE();
  building.translateX(107 + 10);
  building.translateZ(53 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingE();
  building.translateX(107 + 10);
  building.translateZ(53 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingF();
  building.translateX(128 + 10);
  building.translateZ(33 + 20);
  building.rotateY(Math.PI / 2);
  object.add(building);

  return object;
}

function sectorC() {
  const object = new THREE.Object3D();

  var building = buildings.BuildingB();
  building.translateX(87 + 10);
  building.translateZ(87 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingA();
  building.translateX(107 + 10);
  building.translateZ(87 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingA();
  building.translateX(128 + 10);
  building.translateZ(128 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingD();
  building.translateX(128 + 10);
  building.translateZ(87 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingD();
  building.translateX(107 + 10);
  building.translateZ(128 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingE();
  building.translateX(87 + 10);
  building.translateZ(128 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingE();
  building.translateX(128 + 10);
  building.translateZ(108 + 10);
  building.rotateY(Math.PI / 2);
  object.add(building);

  var building = buildings.BuildingF();
  building.translateX(87 + 20);
  building.translateZ(108 + 10);
  object.add(building);

  return object;
}

function pavementA() {
  const geometry = new THREE.BoxBufferGeometry(65, 0.3, 140);
  const material = new THREE.MeshLambertMaterial({ color: "slategray" });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.translateX(65 / 2);
  mesh.translateZ(140 / 2);
  mesh.translateY(0.15);

  mesh.translateX(10);
  mesh.translateZ(10);

  return mesh;
}

function pavementB() {
  const geometry = new THREE.BoxBufferGeometry(65, 0.3, 65);
  const material = new THREE.MeshLambertMaterial({ color: "slategray" });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.translateX(65 / 2);
  mesh.translateZ(65 / 2);
  mesh.translateY(0.15);

  mesh.translateX(85);
  mesh.translateZ(10);

  return mesh;
}

function pavementC() {
  const geometry = new THREE.BoxBufferGeometry(65, 0.3, 65);
  const material = new THREE.MeshLambertMaterial({ color: "slategray" });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.translateX(65 / 2);
  mesh.translateZ(65 / 2);
  mesh.translateY(0.15);

  mesh.translateX(85);
  mesh.translateZ(85);

  return mesh;
}

export { Block, City };
