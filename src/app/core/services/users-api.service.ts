import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ENDPOINTS, SERVER_URL } from 'src/app/shared/constants';
import { getURLPath } from 'src/app/shared/helpers/path-url-separator';
import { User } from '../interfaces/user.interface';

export type UserResponse = {
  id: string;
  name: string;
  login: string;
};

@Injectable()
export class UsersApiService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      getURLPath([SERVER_URL, ENDPOINTS.users]),
    );
  }

  public getById(id: User['id']): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      getURLPath([SERVER_URL, ENDPOINTS.users, id]),
    );
  }

  public update(
    id: User['id'],
    updatedUser: Omit<User, 'id'>,
  ): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      getURLPath([SERVER_URL, ENDPOINTS.users, id]),
      updatedUser,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      },
    );
  }

  public delete(id: User['id']): Observable<HttpStatusCode.NoContent> {
    return this.http.delete<HttpStatusCode.NoContent>(
      getURLPath([SERVER_URL, ENDPOINTS.users, id]),
    );
  }
}
