import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";

export class BipedalRobot extends BaseRobot {
  constructor(name: string) {
    super(name, 1.5, RobotTypes.Bipedal);
  }
}
