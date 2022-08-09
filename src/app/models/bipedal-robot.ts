import { BaseRobot } from "./base-robot";
import { RobotTypes } from "./robot-types";
import { Task } from "./task";

export class BipedalRobot extends BaseRobot {
  constructor(name: string, tasks: Task[]) {
    super(name, 1.5, RobotTypes.Bipedal, tasks);
  }
}
