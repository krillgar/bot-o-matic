import { Observable } from "rxjs";
import { Task } from "./task";

export interface Robot {
  name: string;
  type: string;

  addTask: (task: Task) => void;
  performTasks: () => number;
  processedTasks: () => Observable<string>;
  tasks: () => Observable<Task[]>;
}
