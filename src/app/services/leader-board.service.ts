import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LeaderBoardItem } from '../models/leader-board-item';
import { StorageKeys } from '../models/storage-keys';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardService {
  private leaderList: LeaderBoardItem[] = [];
  private readonly _leaders = new BehaviorSubject<LeaderBoardItem[]>([]);

  constructor(private readonly localStorage: LocalStorageService) {
    this.leaderList = this.localStorage.getData(StorageKeys.LeaderBoard || []);
    this._leaders.next(this.leaderList);
  }

  public leaders(): Observable<LeaderBoardItem[]> {
    return this._leaders;
  }

  public add(item: LeaderBoardItem): void {
    if (!this.leaderList) {
      this.leaderList = [];
    }

    this.leaderList.push(item);
    this.leaderList = this.leaderList
                          .sort((one, two) => one.time > two.time ? 1 :
                                                one.time < two.time ? -1 : 0)
                          .slice(0, 10);

    this.localStorage.set(StorageKeys.LeaderBoard, this.leaderList);
    this._leaders.next(this.leaderList);
  }
}
