import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatLegacySelect as MatSelect } from '@angular/material/legacy-select';
import { Subscription } from 'rxjs';
import { Robot } from 'src/app/models/robot';
import { Task } from 'src/app/models/task';
import { RobotService } from 'src/app/services/robot.service';
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
  private robot!: Robot;

  public chosenTask = '';
  public tasks: Task[] = [];

  constructor(
    private readonly taskService: TaskService,
    private readonly robotService: RobotService
  ) { }

  public ngOnInit(): void {
    this.taskService.resetTasks();

    this.subs.push(
      this.taskService.tasks().subscribe(
        (tasks: Task[]) => {
          if (!!this.robot) {
            this.subs.push(
              this.robot.tasks().subscribe(
                (robotTasks: Task[]) => {
                  robotTasks.forEach((rt: Task) => {
                    tasks = tasks.filter((t: Task) => rt.description !== t.description);
                  });

                  this.tasks = tasks;
                }
              )
            )
          }

          this.tasks = tasks;

          if (!!this.select) {
            this.select.value = null;
          }
        })
    );

    this.subs.push(
      this.robotService.current().subscribe(
        (robot: Robot | null) => {
          this.robot = robot || {} as Robot;

          this.taskService.resetTasks();
        }
      )
    );
  }

  public ngOnDestroy(): void {
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
