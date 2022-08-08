import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private readonly storage: StorageService) { }

  public getData<T>(key: string): T {
    return this.storage.get(key) as T;
  }

  public set<T>(key: string, data: T): void {
    this.storage.set(key, data);
  }
}
