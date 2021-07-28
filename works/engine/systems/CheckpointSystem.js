import * as THREE from "../../../build/three.module.js";

export class CheckpointSystem {
    currentIndex = 0;
    clock = new THREE.Clock();
    lastTime = 0;
    aircraft;

    constructor(aircraft, checkpoints) {
        this.aircraft = aircraft;
        this.checkpoints = checkpoints;
    }

    update(entity, world, dt) {
        if (this.currentIndex >= this.checkpoints.length) {
            return false;
        }

        const currentTime = (this.currentIndex > 0) ?
            this.clock.getElapsedTime() : 0;

        this.checkpoints.forEach((checkpoint, index) => {
            if (this.currentIndex === index) {
                const aircraftBbox = new THREE.Box3().setFromObject(this.aircraft.object);
                if (aircraftBbox.intersectsBox(checkpoint.bbox)) {
                    this.lastTime = currentTime;
                    checkpoint.object.visible = false;
                    this.currentIndex++;
                }
            } else if (index === this.currentIndex + 1) {
                checkpoint.object.visible = true;
            } else {
                checkpoint.object.visible = false;
            }
        });

        document.getElementById("time").innerText = `${currentTime.toFixed(3)} s (${this.lastTime.toFixed(3)})`;

        return false;
    }
}
