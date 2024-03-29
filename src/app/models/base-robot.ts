import { BehaviorSubject, Observable } from "rxjs";
import { Robot } from "./robot";
import { RobotTypes } from "./robot-types";
import { Task } from "./task";

export abstract class BaseRobot implements Robot {
  private taskList: Task[];
  private readonly _tasks: BehaviorSubject<Task[]>;
  private readonly _processedTasks = new BehaviorSubject<string>('');

  public readonly type: string = '';

  constructor(
    public readonly name: string,
    private readonly adjustment: number,
    robotType: RobotTypes,
    tasks: Task[]
  ) {
    if (adjustment === 0) {
      this.adjustment = 1;
    }

    this.taskList = tasks;
    this._tasks = new BehaviorSubject<Task[]>(this.taskList);
    this.type = RobotTypes[robotType];
  }

  public addTask(task: Task): void {
    this.taskList.push(task);

    this._tasks.next(this.taskList);
  }

  public performTasks(): number {
    let total = 0;

    this.taskList.forEach((task: Task) => {
      let rand = Math.random() / 10;

      if (new Date().getMilliseconds() % 2 === 0) {
        rand += 1;
      } else {
        rand = 1 - rand;
      }

      let time = Math.round(task.eta * this.adjustment * rand);
      total += time;

      setTimeout(
        () => {
          this._processedTasks.next(`Completed ${task.description} in ${time} milliseconds.`);
        },
        time
      );
    });

    return total;
  }

  public processedTasks(): Observable<string> {
    return this._processedTasks;
  }

  public removeTask(task: Task): void {
    this.taskList = this.taskList.filter((t: Task) => t.description !== task.description);

    this._tasks.next(this.taskList);
  }

  public tasks(): Observable<Task[]> {
    return this._tasks;
  }
}
