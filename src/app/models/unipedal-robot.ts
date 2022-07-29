import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";

export class UnipedalRobot extends BaseRobot {
  constructor(name: string) {
    super(name, 1.75, RobotTypes.Unipedal);
  }
}
