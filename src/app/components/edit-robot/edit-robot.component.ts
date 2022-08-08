import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Robot } from 'src/app/models/robot';
import { Task } from 'src/app/models/task';
import { LeaderBoardService } from 'src/app/services/leader-board.service';
import { RobotService } from 'src/app/services/robot.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-robot',
  templateUrl: './edit-robot.component.html',
  styleUrls: ['./edit-robot.component.scss']
})
export class EditRobotComponent implements OnInit, OnDestroy {
  private readonly anCharacters = ['a', 'e', 'h', 'i', 'o', 'y'];
  private readonly subs: Subscription[] = [];

  public completedTasks: string[] = [];
  public displayProgress = false;
  public robot: Robot | null = null;
  public tasks: Task[] = [];
  public total = 0;
  public type = '';
  public disableButton = !!this.robot && this.tasks.length === 0;

  constructor(
    private readonly robotService: RobotService,
    private readonly taskService: TaskService,
    private readonly leaderBoardService: LeaderBoardService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.robotService.current().subscribe((robot: Robot) => {
        this.robot = robot;

        if (!!robot) {
          const article = this.anCharacters.indexOf(robot.type[0].toLowerCase()) > -1 ? 'An' : 'A';
          this.type = `${article} ${robot.type}`;

          this.subs.push(this.robot.tasks().subscribe((tasks: Task[]) => this.tasks = tasks));

          this.subs.push(
            this.robot.processedTasks().subscribe((item: string) => {
              if (item.trim().length > 0) {
                this.completedTasks.push(item);
              }

              if (this.completedTasks.length === this.tasks.length) {
                this.displayProgress = false;
              }
            }));
        }
      })
    );
  }

  ngOnDestroy(): void {
      this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public taskSelected(task: Task): void {
    this.robot?.addTask(task);
  }

  public removeTask(task: Task): void {
    this.robot?.removeTask(task);

    this.taskService.addTask(task);
  }

  public runTasks(): void {
    this.displayProgress = true;
    this.completedTasks = [];
    this.total = 0;

    this.total = (this.robot?.performTasks() ?? 0) / 1000;

    this.leaderBoardService.add({name: this.robot?.name || '', time: this.total});
  }
}
