import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserStateService } from './user-state.service';
import { UserTokenService } from './user-token.service';
import { UsersApiService } from './users-api.service';

@Injectable()
export class UserAuthenticationService {
  private isAuthUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  public get isAuth$(): Observable<boolean> {
    return this.isAuthUser$.asObservable();
  }

  public get isAuth(): boolean {
    return this.isAuthUser$.getValue();
  }

  constructor(
    private userTokenService: UserTokenService,
    private usersApiService: UsersApiService,
    private userStateService: UserStateService,
  ) {}

  // call method on signIn
  public initAuth(): void {
    const userToken = this.userTokenService.getToken();
    if (!userToken) return;

    const { userId } = jwtDecode<{ userId: string; login: string }>(userToken);
    if (userId) {
      this.usersApiService.getById(userId).subscribe((user) => {
        this.userStateService.init(user);
        this.isAuthUser$.next(true);
      });
    }
  }
}
