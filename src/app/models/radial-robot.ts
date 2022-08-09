import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";
import { Task } from "./task";

export class RadialRobot extends BaseRobot {
  constructor(name: string, tasks: Task[]) {
    super(name, 0.75, RobotTypes.Radial, tasks);
  }
}
