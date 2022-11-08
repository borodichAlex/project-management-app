import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserData } from './types';

type UserStorageKey = 'userData';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userData$: Subject<UserData> = new Subject();

  private storageKey: UserStorageKey = 'userData';

  public get userData(): Observable<UserData> {
    return this.userData$.asObservable();
  }

  constructor() {
    this.init();
  }

  public init(): void {
    const userDataOfStorage = window.localStorage.getItem(this.storageKey);
    if (userDataOfStorage) {
      this.userData$.next(JSON.parse(userDataOfStorage));
    }
  }

  public saveUser(user: UserData): void {
    window.localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.userData$.next(user);
  }
}
