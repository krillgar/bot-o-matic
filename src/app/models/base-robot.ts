import { BehaviorSubject, Observable } from "rxjs";
import { Robot } from "./robot";
import { Task } from "./task";

export abstract class BaseRobot implements Robot {
  private readonly taskList: Task[] = [];
  private readonly _tasks = new BehaviorSubject<Task[]>([]);
  private readonly _processedTasks = new BehaviorSubject<string>('');

  constructor(
    public readonly name: string,
    private readonly adjustment: number
  ) {
    if (adjustment === 0) {
      this.adjustment = 1;
    }
  }

  public addTask(task: Task): void {
    this.taskList.push(task);

    this._tasks.next(this.taskList);
  }

  public performTasks(): number {
    let total = 0;

    this.taskList.forEach((task: Task) => {
      let time = task.eta * this.adjustment;
      total += time;

      this._processedTasks.next(`Completed ${task.description} in ${time} milliseconds.`);
    });

    return total;
  }

  public processedTasks(): Observable<string> {
    return this._processedTasks;
  }

  public tasks(): Observable<Task[]> {
    return this._tasks;
  }
}
