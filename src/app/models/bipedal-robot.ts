import { BaseRobot } from "./base-robot";

export class BipedalRobot extends BaseRobot {
  constructor(name: string) {
    super(name, 1.5);
  }
}
