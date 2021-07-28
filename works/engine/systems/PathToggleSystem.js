export class PathToggleSystem {
    path;

    constructor(path) {
        this.path = path;
    }

    update(entity, world, dt) {
        if (world.input.down("enter")) {
            this.path.visible = !this.path.visible;
        }
        return false;
    }
}
