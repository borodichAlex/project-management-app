/* eslint-disable no-console */
// eslint-disable-next-line object-curly-newline
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ENDPOINTS, SERVER_URL } from 'src/app/shared/constants';
import { ILoginRequest, ITokenResponce } from './types';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private token: string;

  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.token = window.localStorage.getItem(TOKEN_KEY) || '';
    this.isLoggedIn$.next(!!this.token);
  }

  public logIn(login: string, password: string) {
    // eslint-disable-next-line no-console
    console.log('logged in');
    this.token = 'mocked-token';
    this.signInRequest({
      login,
      password,
    } as ILoginRequest).subscribe(
      (response) => {
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.body);
      },
      (err) => {
        console.log(err.statusText);
      },
    );
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

  private signInRequest(user: ILoginRequest) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post<HttpResponse<ITokenResponce>>(
      `${SERVER_URL}/${ENDPOINTS.signin}`,
      user,
      {
        headers,
      },
    );
  }
}
