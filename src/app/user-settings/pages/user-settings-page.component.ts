import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import { User, UserData } from 'src/app/core/interfaces/user.interface';

import {
  ConfirmationComponent,
  DialogData,
} from 'src/app/shared/components/confirmation/confirmation.component';

import { UserStateService } from 'src/app/core/services/user-state.service';
import { UserSettingsService } from '../services/user-settings.service';

import {
  ConfirmationDialogPasswordComponent,
  ConfirmationDialogPasswordData,
} from '../components/confirmation-dialog-password/confirmation-dialog-password.component';

@Component({
  selector: 'app-user-settings-page',
  templateUrl: './user-settings-page.component.html',
  styleUrls: ['./user-settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsPageComponent implements OnInit, OnDestroy {
  public user!: UserData;

  private subscription!: Subscription;

  constructor(
    private userStateService: UserStateService,
    private userSettingsService: UserSettingsService,
    private dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.subscription = this.userStateService.user$.subscribe((userData) => {
      if (userData) {
        this.user = userData;
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onDeleteClick(): void {
    // TODO:
    // * add translating
    // * verification password
    const message = {
      title: 'Delete Account',
      description: 'Would you like to delete your account?',
    };

    this.openDeleteUserDialog(message).subscribe((isConfirm) => {
      if (isConfirm) {
        this.userSettingsService.deleteUser();
      }
    });
  }

  public handleChangeField(partialUser: Partial<UserData>): void {
    const userPassword = this.userStateService.userSecret;

    // TODO: add spinners
    if (userPassword?.password) {
      this.userSettingsService.editUser(partialUser, userPassword);
    } else {
      this.confirmationUserPassword().subscribe((password) => {
        if (password) {
          this.userSettingsService.editUser(partialUser, {
            password,
          });
        }
      });
    }
  }

  private confirmationUserPassword(): Observable<string> {
    // TODO: add translating
    const modalConfig = {
      password: '',
      confirmationTitleText: 'Enter your password',
      confirmationButtonText: 'Confirm',
    };
    return this.openConfirmationPasswordDialog(modalConfig);
  }

  private openConfirmationPasswordDialog(
    data: ConfirmationDialogPasswordData,
  ): Observable<User['password']> {
    const dialogRef = this.dialog.open(ConfirmationDialogPasswordComponent, {
      width: '300px',
      data,
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }

  private openDeleteUserDialog(message: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: message,
    });

    return dialogRef.afterClosed();
  }
}
