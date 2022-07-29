import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Robot } from 'src/app/models/robot';
import { Task } from 'src/app/models/task';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-edit-robot',
  templateUrl: './edit-robot.component.html',
  styleUrls: ['./edit-robot.component.scss']
})
export class EditRobotComponent implements OnInit, OnDestroy {
  private readonly anCharacters = ['a', 'e', 'h', 'i', 'o', 'y'];
  private readonly subs: Subscription[] = [];

  public robot: Robot | null = null;
  public tasks: Task[] = [];
  public type = '';

  constructor(
    private readonly robotService: RobotService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.robotService.current().subscribe((robot: Robot) => {
        this.robot = robot;

        if (!!robot) {
          const article = this.anCharacters.indexOf(robot.type[0].toLowerCase()) > -1 ? 'An' : 'A';
          this.type = `${article} ${robot.type}`;

          this.subs.push(this.robot.tasks().subscribe((tasks: Task[]) => this.tasks = tasks));
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
}
