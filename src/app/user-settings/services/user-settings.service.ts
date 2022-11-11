import { Injectable } from '@angular/core';
import {
  UserData,
  UserSecretData,
} from 'src/app/core/interfaces/user.interface';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { UsersRestApiService } from 'src/app/core/services/users-rest-api.service';

@Injectable()
export class UserSettingsService {
  constructor(
    private usersApiService: UsersRestApiService,
    private userStateService: UserStateService,
  ) {}

  public editUser(
    partialUser: Partial<UserData>,
    userPassword: UserSecretData,
  ): void {
    const { id, name, login } = this.userStateService.user;

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
    const { id } = this.userStateService.user;

    this.usersApiService.delete(id).subscribe((res) => {
      if (res === 204) {
        // TODO: add call AuthService.logout()
      }
    });
  }
}
