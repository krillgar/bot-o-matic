import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";
import { Task } from "./task";

export class UnipedalRobot extends BaseRobot {
  constructor(name: string, tasks: Task[]) {
    super(name, 1.75, RobotTypes.Unipedal, tasks);
  }
}
