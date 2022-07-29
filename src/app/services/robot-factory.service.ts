import { Injectable } from '@angular/core';
import { AeronauticalRobot } from '../models/aeronautical-robot';
import { ArachnidRobot } from '../models/arachnid-robot';
import { BipedalRobot } from '../models/bipedal-robot';
import { QuadrupedalRobot } from '../models/quadrupedal-robot';
import { RadialRobot } from '../models/radial-robot';
import { Robot } from '../models/robot';
import { RobotTypes } from '../models/robot-types';
import { UnipedalRobot } from '../models/unipedal-robot';

@Injectable({
  providedIn: 'root'
})
export class RobotFactoryService {
  public create(name: string, type: RobotTypes): Robot {
    switch(type) {
      case RobotTypes.Unipedal:
        return new UnipedalRobot(name);
      case RobotTypes.Bipedal:
        return new BipedalRobot(name);
      case RobotTypes.Quadrupedal:
        return new QuadrupedalRobot(name);
      case RobotTypes.Arachnid:
        return new ArachnidRobot(name);
      case RobotTypes.Radial:
        return new RadialRobot(name);
      case RobotTypes.Aeronautical:
        return new AeronauticalRobot(name);
      default:
        throw new Error(`${RobotTypes[type]} is not a valid type of Robot.`);
    }
  }
}
