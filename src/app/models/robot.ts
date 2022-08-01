import { Observable } from "rxjs";
import { Task } from "./task";

export interface Robot {
  name: string;
  type: string;

  addTask: (task: Task) => void;
  performTasks: () => number;
  processedTasks: () => Observable<string>;
  removeTask: (task: Task) => void;
  tasks: () => Observable<Task[]>;
}
