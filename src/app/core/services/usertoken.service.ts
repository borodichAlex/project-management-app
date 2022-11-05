import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class UsertokenService {
  // private token: string;

  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    const token = window.localStorage.getItem(TOKEN_KEY) || '';
    this.isLoggedIn$.next(!!token);
  }

  public removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
    this.isLoggedIn$.next(false);
  }

  public setToken(token: string) {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      this.removeToken();
    }
    this.isLoggedIn$.next(!!token);
  }

  // eslint-disable-next-line class-methods-use-this
  public getToken() {
    return window.localStorage.getItem(TOKEN_KEY) || '';
  }
}
