import * as THREE from "../../../build/three.module.js";

const defaultMaterial = new THREE.MeshBasicMaterial({
    color: 'orange',
    transparent: true,
    opacity: 0.5
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
