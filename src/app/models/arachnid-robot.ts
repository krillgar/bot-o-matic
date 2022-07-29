import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";

export class ArachnidRobot extends BaseRobot {
  constructor(name: string) {
    super(name, 0.9, RobotTypes.Arachnid);
  }
}
