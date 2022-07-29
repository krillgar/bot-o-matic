import { BaseRobot } from "./base-robot";

export class UnipedalRobot extends BaseRobot {
  constructor(name: string) {
    super(name, 1.75);
  }
}
