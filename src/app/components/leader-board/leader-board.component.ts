import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LeaderBoardItem } from 'src/app/models/leader-board-item';
import { LeaderBoardService } from 'src/app/services/leader-board.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit, OnDestroy {
  public leaders: LeaderBoardItem[] = [];
  private readonly subs: Subscription[] = [];

  constructor(private readonly service: LeaderBoardService) { }

  public ngOnInit(): void {
    this.subs.push(
      this.service.leaders().subscribe((items: LeaderBoardItem[]) => this.leaders = items)
    );
  }

  public ngOnDestroy(): void {
      this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
