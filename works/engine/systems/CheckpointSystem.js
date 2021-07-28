import * as THREE from "../../../build/three.module.js";

export class CheckpointSystem {
    currentIndex = 0;
    aircraft;

    constructor(aircraft, checkpoints) {
        this.aircraft = aircraft;
        this.checkpoints = checkpoints;
    }

    update(entity, world, dt) {
        this.checkpoints.forEach((checkpoint, index) => {
            if (this.currentIndex === index) {
                const aircraftBbox = new THREE.Box3().setFromObject(this.aircraft.object);
                if (aircraftBbox.intersectsBox(checkpoint.bbox)) {
                    checkpoint.object.visible = false;
                    this.currentIndex++;
                }
            } else if (index === this.currentIndex + 1) {
                checkpoint.object.visible = true;
            } else {
                checkpoint.object.visible = false;
            }
        });
    }
}
