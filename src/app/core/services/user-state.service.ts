import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, UserData, UserSecretData } from '../interfaces/user.interface';

@Injectable()
export class UserStateService {
  public get user$(): Observable<UserData> {
    return this.userData$.asObservable();
  }

  public get user(): UserData {
    return this.userData$.getValue();
  }

  private userData$!: BehaviorSubject<UserData>;

  private userSecretData!: UserSecretData;

  public get userSecret(): UserSecretData {
    return this.userSecretData;
  }

  private set userSecret(value: UserSecretData) {
    this.userSecretData = value;
  }

  public init(user: UserData): void {
    this.userData$ = new BehaviorSubject<UserData>(user);
  }

  public saveUser({ id, name, login, password }: User): void {
    const userSecretData = {
      password,
    };
    const userData = {
      id,
      name,
      login,
    };
    this.userData$.next(userData);

    this.userSecret = userSecretData;
  }
}
