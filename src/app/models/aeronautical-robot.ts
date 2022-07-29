import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";

export class AeronauticalRobot extends BaseRobot {
  constructor(name: string) {
    super(name, 0.45, RobotTypes.Aeronautical);
  }
}
