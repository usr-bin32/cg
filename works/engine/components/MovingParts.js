export class MovingParts {
  constructor(object) {
    this.leftElevon = object.getObjectByName("leftElevon");
    this.rightElevon = object.getObjectByName("rightElevon");
    this.rudder = object.getObjectByName("rudder");
  }
}
