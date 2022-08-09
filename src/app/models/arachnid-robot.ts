import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";
import { Task } from "./task";

export class ArachnidRobot extends BaseRobot {
  constructor(name: string, tasks: Task[]) {
    super(name, 0.9, RobotTypes.Arachnid, tasks);
  }
}
