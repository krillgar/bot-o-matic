import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as taskSource from '../../assets/tasks.json';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly taskList: Task[];

  private _tasks: BehaviorSubject<Task[]> | null = null;

  constructor() {
    //this.taskList = !!taskSource ? [...taskSource] : [];
    this.taskList = [];
  }

  public tasks(): Observable<Task[]> {
    if (!this._tasks) {
      this._tasks = new BehaviorSubject<Task[]>(this.taskList);
    }

    return this._tasks;
  }
}
