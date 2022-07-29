import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";

export class RadialRobot extends BaseRobot {
  constructor(name: string) {
    super(name, 0.75, RobotTypes.Radial);
  }
}
