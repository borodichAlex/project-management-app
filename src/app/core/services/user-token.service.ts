import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable()
export class UserTokenService {
  // eslint-disable-next-line class-methods-use-this
  public removeToken(): void {
    window.localStorage.removeItem(TOKEN_KEY);
  }

  public setToken(token: string) {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      this.removeToken();
    }
  }

  public getToken() {
    const token = window.localStorage.getItem(TOKEN_KEY) || '';
    if (!token) this.removeToken();
    return token; // return error
  }
}
