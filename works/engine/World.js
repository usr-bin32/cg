export class World {
  constructor(state, input) {
    this.state = state;
    this.prevState = null;

    this.input = input;
  }

  get scene() {
    return this.state.scene;
  }

  get camera() {
    return this.state.camera;
  }

  get systems() {
    return this.state.systems;
  }

  get entities() {
    return this.state.entities;
  }

  setState(state) {
    this.prevState = this.state;
    this.state = state;
  }

  update(dt) {
    for (const system of this.systems) {
      for (const entity of this.entities) {
        system.update(entity, this, dt);
      }
    }
  }
}

export class GameState {
  constructor(scene, camera, systems = [], entities = []) {
    this.scene = scene;
    this.camera = camera;
    this.systems = systems;
    this.entities = entities;
  }
}
