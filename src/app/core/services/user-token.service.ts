import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  // private token: string;

  public isLoggedIn$: BehaviorSubject<boolean>;

  constructor() {
    const token = window.localStorage.getItem(TOKEN_KEY) || '';
    this.isLoggedIn$ = new BehaviorSubject(!!token);
  }

  public removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
    this.isLoggedIn$.next(false);
  }

  public setToken(token: string) {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
      this.isLoggedIn$.next(true);
    } else {
      this.removeToken();
    }
  }

  public getToken() {
    const token = window.localStorage.getItem(TOKEN_KEY) || '';
    if (!token) this.removeToken();
    return token;
  }
}
