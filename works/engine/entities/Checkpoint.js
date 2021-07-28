import * as THREE from "../../../build/three.module.js";

export const Checkpoint = {
    build: function (position, rotation) {
        const geometry = new THREE.TorusBufferGeometry(30, 1.5, 64, 64);
        const material = new THREE.MeshPhongMaterial({
            color: 'orange',
            transparent: true,
            opacity: 0.7
        });
        const object = new THREE.Mesh(geometry, material);

        return {
            object,
        };
    },
};
