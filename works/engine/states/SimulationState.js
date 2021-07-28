import * as THREE from "../../../build/three.module.js";

import { GameState } from "../World.js";
import { MovingPartsSystem } from "../systems/MovingPartsSystem.js";
import { ControlsSystem } from "../systems/ControlsSystem.js";
import { ModeSystem } from "../systems/ModeSystem.js";
import { PhysicsSystem } from "../systems/PhysicsSystem.js";
import { SimulationAircraft } from "../entities/SimulationAircraft.js";
import { CameraToggleSystem } from "../systems/CameraToggleSystem.js";
import { GLTFLoader } from "../../../build/jsm/loaders/GLTFLoader.js";
import { Checkpoint } from "../entities/Checkpoint.js";

const WORLD_SCALE = 500;
const CHECKPOINT_DATA = [
    { position: new THREE.Vector3(1.842992734766871e-13, 54.23904337146913, -1186.221159830944), rotation: new THREE.Euler(0, 1.5707963267948966, 0.00677889348841733) },
    { position: new THREE.Vector3(340.09340183551456, 55.378436034323734, -2343.432509515879), rotation: new THREE.Euler(0, 1.1175957071474696, 0.0000221322785002878) },
    { position: new THREE.Vector3(1221.9732237830194, 328.23248603953937, -4142.826175386505), rotation: new THREE.Euler(0, 1.1148939965198787, 0.03295912989639409) },
    { position: new THREE.Vector3(1888.72703712841, 380.6101859477976, -7556.189468068657), rotation: new THREE.Euler(0, 1.8085450762592727, 0.00002425225563053323) },
    { position: new THREE.Vector3(-1692.7035235881408, 1533.9453118671179, -12473.039117459497), rotation: new THREE.Euler(0, 1.8440400508613075, 0.07456083318768987) },
    { position: new THREE.Vector3(-878.6464786145998, 1577.1148748136372, -15532.206846421366), rotation: new THREE.Euler(0, 0.9376717088852572, 0.00027276236890109784) },
    { position: new THREE.Vector3(2343.002368424772, 1577.2750278901563, -15932.305471444584), rotation: new THREE.Euler(0, -0.4725296662722425, 5.729883161657346e-7) },
    { position: new THREE.Vector3(4870.066427385172, 666.377205368642, -13711.741637381745), rotation: new THREE.Euler(0, -1.0931203032747443, -0.1569373124389067) },
];

export const SimulationState = {
    build: function () {
        const scene = new THREE.Scene();

        for (const c of CHECKPOINT_DATA) {
            c.rotation.y -= 1.5707963267948966;

            const checkpoint = Checkpoint.build();
            checkpoint.object.position.copy(c.position);
            checkpoint.object.rotation.copy(c.rotation);
            scene.add(checkpoint.object);
        }

        (() => {
            const loader = new GLTFLoader();
            loader.load("engine/assets/mountains.glb", (terrainGltf) => {
                terrainGltf.scene.scale.set(WORLD_SCALE, WORLD_SCALE, WORLD_SCALE);
                terrainGltf.scene.traverse((child) => {
                    child.receiveShadow = true;
                });
                scene.add(terrainGltf.scene);

                (() => {
                    const loader = new GLTFLoader();
                    loader.load("engine/assets/tree1.glb", (treeGltf) => {
                        const raycaster = new THREE.Raycaster();

                        treeGltf.scene.traverse((child) => {
                            child.castShadow = true;
                        });

                        for (let i = 0; i < 2000; i++) {
                            const tree = treeGltf.scene.clone();

                            const scale = Math.random() + 3;
                            const dx = (Math.random() * 2 - 1) * 8;
                            const dz = (Math.random() * 2 - 1) * 20 - 21.15;

                            tree.scale.set(scale, scale, scale);
                            tree.translateX(dx * WORLD_SCALE);
                            tree.translateZ(dz * WORLD_SCALE);
                            scene.add(tree);

                            // TODO: fix raycasting.
                            // const obj = terrainGltf.scene.children[0].children[0];
                            // const rayOrigin = new THREE.Vector3(dx, -20, dz);
                            // const rayOrientation = new THREE.Vector3(0, 1, 0);
                            // raycaster.set(rayOrigin, rayOrientation);
                            // const intersections = raycaster.intersectObject(obj);
                            // if (intersections.length > 0) {
                            //   tree.scale.set(scale, scale, scale);
                            //   tree.translateX(dx * 10 * WORLD_SCALE);
                            //   tree.translateY(dx * 10 * WORLD_SCALE);
                            //   tree.translateZ(dz * 10 * WORLD_SCALE);
                            //   scene.add(tree);
                            // } else {
                            //   i--;
                            // }
                        }
                    });
                })();
            });
        })();

        const camera = new THREE.PerspectiveCamera(
            65,
            window.innerWidth / window.innerHeight,
            0.1,
            500000
        );
        camera.rotation.y = -Math.PI / 2;
        camera.position.y = 2.5;
        camera.position.x = -20;

        const cameraHolder = new THREE.Object3D();
        cameraHolder.name = "cameraHolder";
        cameraHolder.add(camera);

        const aircraft = SimulationAircraft.build();
        aircraft.object.traverse((child) => {
            child.castShadow = true;
        });

        aircraft.object.position.set(0, 1.5, 0);
        aircraft.object.rotation.set(0, Math.PI / 2, 0);
        aircraft.object.add(cameraHolder);
        scene.add(aircraft.object);

        addLighting(scene, aircraft.object);

        const state = new GameState(
            scene,
            camera,
            [
                new ControlsSystem(),
                new MovingPartsSystem(),
                new PhysicsSystem(),
                new ModeSystem(),
                new CameraToggleSystem(),
            ],
            [aircraft]
        );

        return state;
    },
};

function addLighting(
    scene,
    target,
    position = new THREE.Vector3(20000, 50000, 80000)
) {
    const ambientLight = new THREE.HemisphereLight("white", "darkslategrey", 0.5);

    const sunLight = new THREE.DirectionalLight("white", 0.8);
    sunLight.position.copy(position);
    sunLight.target = target;
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048 * 4;
    sunLight.shadow.mapSize.height = 2048 * 4;

    const d = 500;
    sunLight.shadow.camera.visible = true;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 1000000;

    scene.add(ambientLight);
    scene.add(sunLight);
}
