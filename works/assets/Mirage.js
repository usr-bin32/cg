import * as THREE from "../../build/three.module.js";

const BACK_TUBE_LEN = 188;
const MAIN_TUBE_LEN = 595;
const INTAKE_TUBE_LEN = 425;
const CANOPY_TUBE_LEN = 530;
const CANOPY_BACK_LEN = 100;
const FRONT_BOX_LEN = 420;
const NOSE1_LEN = 60;
const NOSE2_LEN = 60;
const NOSE3_LEN = 120;

const Mirage = () => {
  const aircraft = new THREE.Object3D();

  // Convert to meters.
  const scale = 9.2 / 1102;
  aircraft.rotateY(Math.PI);
  aircraft.translateX(785 * scale);
  aircraft.scale.set(scale, scale, scale);

  aircraft.add(tail());
  aircraft.add(mainTube());
  aircraft.add(leftWing());
  aircraft.add(rightWing());

  const aircraftHolder = new THREE.Object3D();
  aircraftHolder.add(aircraft);

  return aircraftHolder;
};

const camouflage = new THREE.TextureLoader().load("assets/camo.jpg");
const fuselageMaterial = new THREE.MeshPhongMaterial({
  color: 0x647f9c,
  map: camouflage,
  side: THREE.DoubleSide,
  shininess: 50,
});

const fuselageMaterialRaw = new THREE.MeshPhongMaterial({
  color: 0x2d466e,
  side: THREE.DoubleSide,
  shininess: 50,
});

const noseMaterial = new THREE.MeshPhongMaterial({
  color: 0x353841,
  side: THREE.DoubleSide,
});

const nozzleMaterial = new THREE.MeshPhongMaterial({
  color: 0x111111,
  side: THREE.DoubleSide,
});

const canopyMaterial = new THREE.MeshPhongMaterial({
  color: 0x999999,
  emissive: 0x999999,
  shininess: 100,
  emissiveIntensity: 0.5,
  reflectivity: 1,
  opacity: 0.9,
  transparent: true,
});

function tail() {
  const shape = new THREE.Shape([
    new THREE.Vector2(246, -130),
    new THREE.Vector2(133, -87),
    new THREE.Vector2(-171, 135),
    new THREE.Vector2(-208, 130),
    new THREE.Vector2(-246, 124),
    new THREE.Vector2(-229, 57),
    new THREE.Vector2(-185, 57),
    new THREE.Vector2(-134, -100),
    new THREE.Vector2(-201, -100),
    new THREE.Vector2(-201, -140),
  ]);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 1.5 });
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  object.translateY(200);
  object.translateX(-210);

  object.rotateY(Math.PI);

  const leftCanard = canard();
  leftCanard.translateZ(-10);
  leftCanard.translateY(85);
  leftCanard.translateX(-180);
  leftCanard.rotateZ(Math.PI / 2 + 0.075);
  leftCanard.rotateX(-Math.PI);

  const rightCanard = canard();
  rightCanard.translateZ(10);
  rightCanard.translateY(85);
  rightCanard.translateX(-180);
  rightCanard.rotateZ(Math.PI / 2 + 0.075);

  const sticker = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(275, 193),
    new THREE.MeshPhongMaterial({
      color: 0xA0A0A0,
      map: new THREE.TextureLoader().load("assets/braz.png"),
      side: THREE.DoubleSide,
    })
  );
  sticker.scale.set(0.25, 0.25, 0.25);
  sticker.translateZ(10);
  sticker.translateY(-25);
  sticker.translateX(-75);

  object.add(leftCanard);
  object.add(rightCanard);
  object.add(rudder());
  object.add(tailPipe());
  object.add(tailBox());
  object.add(sticker);

  return object;
}

function tailBox() {
  const geometry = new THREE.BoxGeometry(80, 25, 20);
  const object = new THREE.Mesh(geometry, fuselageMaterialRaw);

  object.translateX(-210);
  object.translateY(90);
  object.rotateZ(0.1);

  return object;
}

function rudder() {
  const translation = -185;
  const shape = new THREE.Shape([
    new THREE.Vector2(-229 - translation, 57),
    new THREE.Vector2(-185 - translation, 57),
    new THREE.Vector2(-134 - translation, -100),
    new THREE.Vector2(-201 - translation, -100),
  ]);

  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 1 });
  const object = new THREE.Mesh(geometry, fuselageMaterial);
  object.name = "rudder";

  object.translateX(translation);

  return object;
}

function tailPipe() {
  const len = 425;
  const geometry = new THREE.CylinderGeometry(7.25, 12, len, 64, 64);
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  object.translateX(-30);
  object.translateY(-110);
  // Fix alignment.
  object.translateZ(1);

  object.rotateZ(-Math.PI / 2);

  return object;
}

function leftWing() {
  const object = wing("left");

  object.rotateZ(Math.PI / 2);
  object.rotateY(Math.PI / 2);
  object.position.x = -495;
  object.position.y = -28;
  object.position.z = 70;

  return object;
}

function rightWing() {
  const object = wing("right");

  object.rotateZ(Math.PI / 2);
  object.rotateY(Math.PI / 2);
  object.scale.x *= -1;
  object.position.x = -495;
  object.position.y = -28;
  object.position.z = -70;

  return object;
}

function wing(side) {
  const shape = new THREE.Shape([
    new THREE.Vector2(-476, -245),
    new THREE.Vector2(-16, -245),
    new THREE.Vector2(-16, -435),
    new THREE.Vector2(16, -465),
    new THREE.Vector2(4, 465),
  ]);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 1.5,
    bevelEnabled: true,
  });
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  const sticker = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(425, 425),
    new THREE.MeshPhongMaterial({
      color: 0x647f9c,
      map: new THREE.TextureLoader().load("assets/round.png"),
      side: THREE.DoubleSide,
      transparent: true,
    })
  );
  sticker.scale.set(0.2, 0.2, 0.2);
  sticker.translateZ(10);
  sticker.translateY(-150);
  sticker.translateX(-275);

  object.add(pylon());
  object.add(elevons(side));
  object.add(sticker);

  return object;
}

function pylon() {
  const geometry = new THREE.BoxGeometry(5, 220, 43);
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  object.translateZ(-20);
  object.translateX(-230);

  object.add(fuelTank());

  return object;
}

function fuelTank() {
  const geometry = new THREE.SphereGeometry(0.5, 64, 64);
  const object = new THREE.Mesh(geometry, fuselageMaterialRaw);

  object.scale.x = 600;
  object.scale.y = 80;
  object.scale.z = 80;
  object.rotateZ(Math.PI / 2);
  object.translateZ(-52);

  return object;
}

function elevons(side) {
  const elevons = new THREE.Object3D();
  elevons.name = side + "Elevon";
  elevons.add(outerElevon());
  elevons.add(innerElevon());

  elevons.translateY(-248);
  elevons.translateZ(1);

  return elevons;
}

function outerElevon() {
  const width = 460 * 0.62;
  const height = 100;
  const geometry = new THREE.BoxGeometry(width, height, 12);
  let object = new THREE.Mesh(geometry, fuselageMaterialRaw);

  object.translateX(width / 2 - 481);
  object.translateY(-height / 2);

  return object;
}

function innerElevon() {
  const width = 460 * (1 - 0.62);
  const height = 100;
  const geometry = new THREE.BoxGeometry(width, height, 12);
  let object = new THREE.Mesh(geometry, fuselageMaterialRaw);

  object.translateX(width / 2 - 481 + 460 * 0.62 + 1);
  object.translateY(-height / 2);

  return object;
}

function backTube() {
  const geometry = new THREE.CylinderGeometry(60, 72, BACK_TUBE_LEN, 64, 64);
  const object = new THREE.Mesh(geometry, [
    fuselageMaterial,
    nozzleMaterial,
    nozzleMaterial,
  ]);

  object.translateY(MAIN_TUBE_LEN / 2 + BACK_TUBE_LEN / 2);

  object.add(nozzle());

  return object;
}

function nozzle() {
  const len = 85;
  const geometry = new THREE.CylinderGeometry(50, 60, len, 64, 64, true);
  const object = new THREE.Mesh(geometry, nozzleMaterial);

  object.translateY(BACK_TUBE_LEN / 2 + len / 2);

  return object;
}

function mainTube() {
  const geometry = new THREE.CylinderGeometry(72, 72, MAIN_TUBE_LEN, 64, 64);
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  object.translateX(-MAIN_TUBE_LEN / 2 - BACK_TUBE_LEN);
  object.rotateZ(-Math.PI / 2);

  object.add(backTube());
  object.add(intakeTubes());
  object.add(canopyTube());
  object.add(intake());
  object.add(intakePartLeft());
  object.add(intakePartRight());
  object.add(frontBox());

  return object;
}

function intakeTubes() {
  const geometry = new THREE.CylinderGeometry(51, 80, INTAKE_TUBE_LEN, 64, 64);
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  object.translateY(-INTAKE_TUBE_LEN / 2);
  object.scale.z = 1.4;

  return object;
}

function intake() {
  const len = 95;
  const geometry = new THREE.CylinderGeometry(80, 72, len, 64, 64, true);
  const object = new THREE.Mesh(geometry, fuselageMaterialRaw);

  object.translateY(-len / 2 - INTAKE_TUBE_LEN);
  object.scale.z = 1.4;

  const canardLeft = canard();
  canardLeft.translateZ(76);
  canardLeft.translateY(40);
  canardLeft.translateX(-30);
  canardLeft.rotateY(-Math.PI / 12);

  const canardRight = canard();
  canardRight.translateZ(-76);
  canardRight.translateY(40);
  canardRight.translateX(-30);
  canardRight.rotateY(Math.PI + Math.PI / 12);

  object.add(canardLeft);
  object.add(canardRight);

  return object;
}

function canard() {
  const geometry = new THREE.CylinderGeometry(15, 15, 90, 3, 1);
  geometry.scale(0.1, 1, 1);
  const object = new THREE.Mesh(geometry, fuselageMaterialRaw);

  return object;
}

function intakePart() {
  const geometry = new THREE.ConeGeometry(32, 148, 64, 64, true);
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  object.translateY(-INTAKE_TUBE_LEN / 2 - MAIN_TUBE_LEN / 2);
  object.rotateZ(Math.PI);

  return object;
}

function intakePartLeft() {
  const object = intakePart();
  object.translateZ(-64);

  return object;
}

function intakePartRight() {
  const object = intakePart();
  object.translateZ(64);

  return object;
}

function canopyTube() {
  const geometry = new THREE.CylinderGeometry(15, 46, CANOPY_TUBE_LEN, 64, 64);
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  object.translateY(-CANOPY_TUBE_LEN / 2);
  object.translateX(-57);

  object.add(canopyBack());

  return object;
}

function canopyBack() {
  const geometry = new THREE.CylinderGeometry(46, 56, CANOPY_BACK_LEN, 64, 64);
  const object = new THREE.Mesh(geometry, canopyMaterial);

  object.translateY(-CANOPY_BACK_LEN / 2 - CANOPY_TUBE_LEN / 2);

  object.add(canopyGlue());
  object.add(canopyFront());

  return object;
}

function canopyGlue() {
  const geometry = new THREE.TorusGeometry(57, 57, 64, 64, 0.21);
  const object = new THREE.Mesh(geometry, nozzleMaterial);

  object.rotateY(-Math.PI);
  object.translateY(-CANOPY_BACK_LEN / 2);
  object.translateX(-57);
  object.scale.y = -1;

  return object;
}

function canopyFront() {
  const len = 200;
  const geometry = new THREE.CylinderGeometry(56, 40, len, 64, 64);
  const object = new THREE.Mesh(geometry, [
    canopyMaterial,
    new THREE.MeshPhongMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.3,
      refractionRatio: 0.8,
    }),
  ]);

  object.translateY(-len / 2 - CANOPY_BACK_LEN / 2);
  object.translateX(21);
  object.rotateZ(0.225);

  return object;
}

function frontBox() {
  const geometry = new THREE.CylinderGeometry(1, 0.75, FRONT_BOX_LEN, 64, 64);
  geometry.scale(76, 1, 70);
  const object = new THREE.Mesh(geometry, fuselageMaterial);

  object.translateY(-FRONT_BOX_LEN / 2 - MAIN_TUBE_LEN / 2 - 120);
  object.translateX(-2);

  object.add(fuelPipe());
  object.add(nose1());

  return object;
}

function fuelPipe() {
  const geometry = new THREE.CylinderGeometry(6, 6, 120, 64, 64);
  const object = new THREE.Mesh(geometry, nozzleMaterial);

  object.translateX(-60);
  object.translateZ(-55);
  object.translateY(-420 / 2);

  object.rotateY(-Math.PI / 3);
  object.rotateZ(-Math.PI / 3);

  object.add(fuelPipeEnd());

  return object;
}

function fuelPipeEnd() {
  const geometry = new THREE.CylinderGeometry(6, 6, 48, 64, 64);
  const object = new THREE.Mesh(geometry, nozzleMaterial);

  object.translateY(-60);
  object.rotateZ(Math.PI / 6);
  object.translateY(-22);

  return object;
}

function nose1() {
  const geometry = new THREE.CylinderGeometry(52.5, 48, NOSE1_LEN, 64, 64);
  geometry.scale(76 / 70, 1, 1);
  const object = new THREE.Mesh(geometry, noseMaterial);

  object.translateY(-420 / 2 - NOSE1_LEN / 2);

  object.add(nose2());

  return object;
}

function nose2() {
  const geometry = new THREE.CylinderGeometry(48, 36, NOSE2_LEN, 64, 64);
  geometry.scale(76 / 70, 1, 1);
  const object = new THREE.Mesh(geometry, noseMaterial);

  object.translateY(-NOSE2_LEN / 2 - NOSE1_LEN / 2);

  object.add(nose3());

  return object;
}

function nose3() {
  const geometry = new THREE.CylinderGeometry(36, 5, NOSE3_LEN, 64, 64);
  geometry.scale(76 / 70, 1, 1);
  const object = new THREE.Mesh(geometry, noseMaterial);

  object.translateY(-NOSE3_LEN / 2 - NOSE2_LEN / 2);

  object.add(pitotTube());

  return object;
}

function pitotTube() {
  const len = 92;
  const geometry = new THREE.CylinderGeometry(5, 2, len, 64, 64);
  geometry.scale(76 / 70, 1, 1);
  const object = new THREE.Mesh(geometry, noseMaterial);

  object.translateY(-len / 2 - NOSE3_LEN / 2);

  return object;
}

export { Mirage };
