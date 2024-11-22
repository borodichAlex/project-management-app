import { Injectable } from '@angular/core';
import {
  UserData,
  UserSecretData,
} from 'src/app/core/interfaces/user.interface';
import { UserAuthenticationService } from 'src/app/core/services/user-auth.service';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { UsersApiService } from 'src/app/core/services/users-api.service';

@Injectable()
export class UserSettingsService {
  constructor(
    private usersApiService: UsersApiService,
    private userStateService: UserStateService,
    private userAuthService: UserAuthenticationService,
  ) {}

  public editUser(
    partialUser: Partial<UserData>,
    userPassword: UserSecretData,
  ): void {
    const { id, name, login } = this.userStateService.user!;

    // TODO: add handle error (show snackbar with mistake)
    if (id) {
      this.usersApiService
        .update(id, {
          name,
          login,
          ...partialUser,
          ...userPassword,
        })
        .subscribe((res) => {
          this.userStateService.saveUser({
            ...res,
            ...userPassword,
          });
        });
    }
  }

  public deleteUser(): void {
    const { id } = this.userStateService.user!;

    this.usersApiService.delete(id).subscribe(() => {
      this.userAuthService.logout();
    });
  }
}
