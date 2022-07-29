import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";

export class QuadrupedalRobot extends BaseRobot {
  constructor(name: string){
    super(name, 1.15, RobotTypes.Quadrupedal);
  }
}
