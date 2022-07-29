import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Robot } from 'src/app/models/robot';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.scss']
})
export class RobotListComponent implements OnInit, OnDestroy {
  public robotList: Robot[] = [];
  private sub: Subscription | null = null;

  constructor(private readonly service: RobotService) { }

  ngOnInit(): void {
    this.sub = this.service.robots().subscribe(
      (robots: Robot[]) => {
        this.robotList = robots;
      });
  }

  ngOnDestroy(): void {
      if (this.sub) {
        this.sub.unsubscribe();
      }
  }

  public editRobot(robot: Robot): void {
    this.service.setCurrentRobot(robot);
  }
}
