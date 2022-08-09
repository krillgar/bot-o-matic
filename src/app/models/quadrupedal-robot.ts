import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";
import { Task } from "./task";

export class QuadrupedalRobot extends BaseRobot {
  constructor(name: string, tasks: Task[]){
    super(name, 1.15, RobotTypes.Quadrupedal, tasks);
  }
}
