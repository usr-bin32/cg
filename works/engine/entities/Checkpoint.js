import * as THREE from "../../../build/three.module.js";

const defaultMaterial = new THREE.MeshPhongMaterial({
    color: 'orange',
    transparent: true,
    opacity: 0.7
});
const nextMaterial = new THREE.MeshPhongMaterial({
    color: 'yellow',
    transparent: true,
    opacity: 0.7
});

export const Checkpoint = {
    build: function (position, rotation) {
        const geometry = new THREE.TorusBufferGeometry(30, 1.5, 64, 64);
        const object = new THREE.Mesh(geometry, defaultMaterial);
        object.position.copy(position);
        object.rotation.copy(rotation);

        return {
            object,
            bbox: new THREE.Box3().setFromObject(object),
        };
    },
};
