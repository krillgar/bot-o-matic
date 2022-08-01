import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import taskSource from '../../assets/tasks.json';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList: Task[] = [];

  private _tasks = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.resetTasks();
  }

  public tasks(): Observable<Task[]> {
    return this._tasks;
  }

  public addTask(task: Task): void {
    this.taskList.push(task);

    this._tasks.next(this.taskList);
  }

  public removeTask(task: Task): void {
    this.taskList = this.taskList.filter((t: Task) => t.description !== task.description);

    this._tasks.next(this.taskList);
  }

  public resetTasks(): void {
    this.taskList = !!taskSource ? [...taskSource] : [];

    this._tasks.next(this.taskList);
  }
}
