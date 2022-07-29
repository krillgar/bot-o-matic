import { Component, OnDestroy, OnInit } from '@angular/core';
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
  private readonly subs: Subscription[] = [];

  public robot: Robot | null = null;
  public tasks: Task[] = [];

  constructor(
    private readonly robotService: RobotService,
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.robotService.current().subscribe((robot: Robot) => this.robot = robot)
    );

    this.subs.push(
      this.taskService.tasks().subscribe((tasks: Task[]) => this.tasks = tasks)
    );
  }

  ngOnDestroy(): void {
      this.subs.forEach((sub: Subscription) => {
        sub.unsubscribe();
      });
  }
}
