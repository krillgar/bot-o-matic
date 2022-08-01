import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  @Input()
  public disableSelect = false;
  @Output()
  public taskSelected = new EventEmitter<Task>();
  @ViewChild('select')
  public select!: MatSelect;

  private readonly subs: Subscription[] = [];

  public chosenTask = '';
  public tasks: Task[] = [];

  constructor(
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.resetTasks();

    this.subs.push(
      this.taskService.tasks().subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;

          if (!!this.select) {
            this.select.value = null;
          }
        })
    );
  }

  ngOnDestroy(): void {
      this.subs.forEach((sub: Subscription) => {
        sub.unsubscribe();
      });
  }

  public pickTask(): void {
    var task = this.tasks.find((t: Task) => t.description === this.chosenTask);

    this.chosenTask = '';

    if (task) {
      this.taskSelected.emit(task);
      this.taskService.removeTask(task);
    }
  }
}
