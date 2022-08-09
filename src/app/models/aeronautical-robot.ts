import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";
import { Task } from "./task";

export class AeronauticalRobot extends BaseRobot {
  constructor(name: string, tasks: Task[]) {
    super(name, 0.45, RobotTypes.Aeronautical, tasks);
  }
}
