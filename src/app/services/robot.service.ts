import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Robot } from "../models/robot";
import { RobotTypes } from '../models/robot-types';
import { RobotFactoryService } from './robot-factory.service';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private readonly robotList: Robot[] = [];
  private readonly currentRobot = new Subject<Robot>();
  private readonly _robots = new BehaviorSubject<Robot[]>([]);

  constructor(private readonly factory: RobotFactoryService) {}

  public current(): Observable<Robot> {
    return this.currentRobot;
  }

  public robots(): Observable<Robot[]> {
    return this._robots;
  }

  public add(name: string, type: RobotTypes): void {
    const robot = this.factory.create(name, type);
    this.robotList.push(robot);

    this._robots.next(this.robotList);
  }

  public setCurrentRobot(robot: Robot): void {
    this.currentRobot.next(robot);
  }
}
