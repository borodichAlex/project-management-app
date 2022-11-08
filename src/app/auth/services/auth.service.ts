import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITokenResponce } from 'src/app/core/services/types';
import { SERVER_URL, ENDPOINTS } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(name: string, login: string, password: string) {
    return this.http.post(`${SERVER_URL}/${ENDPOINTS.signup}`, {
      name: name!,
      login: login!,
      password: password!,
    });
  }

  signIn(login: string, password: string): Observable<ITokenResponce> {
    return this.http.post<ITokenResponce>(`${SERVER_URL}/${ENDPOINTS.signin}`, {
      login: login!,
      password: password!,
    });
  }
}
