import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  @Output()
  public taskSelected = new EventEmitter<Task>();

  private readonly subs: Subscription[] = [];

  public chosenTask = '';
  public tasks: Task[] = [];

  constructor(
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.taskService.tasks().subscribe((tasks: Task[]) => this.tasks = tasks)
    );
  }

  ngOnDestroy(): void {
      this.subs.forEach((sub: Subscription) => {
        sub.unsubscribe();
      });
  }

  public pickTask(): void {
    var task = this.tasks.find((t: Task) => t.description === this.chosenTask);

    if (task) {
      this.taskSelected.emit(task);
    }

    this.chosenTask = '';
  }
}
