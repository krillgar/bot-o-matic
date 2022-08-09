import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Robot } from "../models/robot";
import { RobotTypes } from '../models/robot-types';
import { StorageKeys } from '../models/storage-keys';
import { LocalStorageService } from './local-storage.service';
import { RobotFactoryService } from './robot-factory.service';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private _current: Robot | null = null;
  private robotList: Robot[] = [];
  private readonly currentRobot = new Subject<Robot | null>();
  private readonly _robots = new BehaviorSubject<Robot[]>([]);

  constructor(
    private readonly factory: RobotFactoryService,
    private readonly localStorage: LocalStorageService) {
      const storedRobots: Robot[] = this.localStorage.getData(StorageKeys.Robots) || [];
      this.robotList = storedRobots.map((robot: Robot) => {
        const created = this.factory.create(
          robot.name,
          RobotTypes[robot.type as keyof typeof RobotTypes],
          (robot as any).taskList
        );

        created.tasks().subscribe(() => this.updateStorage());

        return created;
      });

      this._robots.next(this.robotList);
  }

  public current(): Observable<Robot | null> {
    return this.currentRobot;
  }

  public robots(): Observable<Robot[]> {
    return this._robots;
  }

  public add(name: string, type: RobotTypes): void {
    const robot = this.factory.create(name, type);
    robot.tasks().subscribe(() => this.updateStorage());

    this.robotList.push(robot);

    this.updateStorage();
    this._robots.next(this.robotList);
  }

  public removeRobot(robot: Robot): void {
    if (this._current === robot) {
      this.currentRobot.next(null);
    }

    this.robotList = this.robotList.filter((r: Robot) => r !== robot);
    this.updateStorage(true);
    this._robots.next(this.robotList);
  }

  public setCurrentRobot(robot: Robot): void {
    this._current = robot;
    this.currentRobot.next(robot);
  }

  private updateStorage(allowEmpty = false): void {
    if (this.robotList.length > 0 || allowEmpty) {
      this.localStorage.set(
        StorageKeys.Robots,
        this.robotList.map((robot: Robot) => {
          return {
            name: robot.name,
            type: robot.type,
            taskList: (robot as any).taskList
          }
        })
      );
    }
  }
}
