import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenResponce } from 'src/app/core/services/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  SIGNUP_URL = 'http://localhost:4000/signup';

  SIGNIN_URL = 'http://localhost:4000/signin';

  signUp(name: string, login: string, password: string) {
    return this.http.post(this.SIGNUP_URL, {
      name: name!,
      login: login!,
      password: password!,
    });
  }

  signIn(login: string, password: string): Observable<ITokenResponce> {
    return this.http.post<ITokenResponce>(this.SIGNIN_URL, {
      login: login!,
      password: password!,
    });
  }
}
