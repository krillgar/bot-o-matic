import { Component, OnInit } from '@angular/core';
import { RobotTypes } from 'src/app/models/robot-types';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit {
  public name: string = '';
  public type: RobotTypes | string | null = null;

  public readonly types: string[];

  constructor(private readonly robotService: RobotService) {
    this.types = Object.keys(RobotTypes).filter((type) => isNaN(parseInt(type)));
  }

  ngOnInit(): void { }

  public onSubmit(): void {
    if (typeof this.type === 'string') {
      this.type = RobotTypes[this.type as keyof typeof RobotTypes];
    }

    this.robotService.add(this.name, this.type as RobotTypes);

    this.name = '';
    this.type = null;
  }
}
