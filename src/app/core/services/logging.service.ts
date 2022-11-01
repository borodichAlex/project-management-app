import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private token: string;

  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.token = window.localStorage.getItem(TOKEN_KEY) || '';
    this.isLoggedIn$.next(!!this.token);
  }

  public logIn() {
    // eslint-disable-next-line no-console
    console.log('logged in');
    this.token = 'mocked-token';
    window.localStorage.setItem(TOKEN_KEY, this.token);
    this.isLoggedIn$.next(!!this.token);
  }

  public logOut() {
    // eslint-disable-next-line no-console
    console.log('logged out');
    this.token = '';
    window.localStorage.removeItem(TOKEN_KEY);
    this.isLoggedIn$.next(!!this.token);
  }
}
