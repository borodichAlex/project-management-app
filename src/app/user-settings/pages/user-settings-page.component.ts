import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first, Observable, Subscription, switchMap } from 'rxjs';

import { User, UserData } from 'src/app/core/interfaces/user.interface';

import {
  ConfirmationComponent,
  DialogData,
} from 'src/app/shared/components/confirmation/confirmation.component';

import { UserStateService } from 'src/app/core/services/user-state.service';
import { TranslateService } from '@ngx-translate/core';
import { UserSettingsService } from '../services/user-settings.service';

import {
  ConfirmationDialogPasswordComponent,
  ConfirmationDialogPasswordData,
} from '../components/confirmation-dialog-password/confirmation-dialog-password.component';

export type TranslateUserSettingsPageModalData = {
  deleteUserDialog: {
    title: string;
    description: string;
    confirmButtonText: string;
    rejectButtonText: string;
  };
  confirmationPasswordDialog: {
    titleText: string;
    confirmButtonText: string;
    rejectButtonText: string;
    inputPlaceholder: string;
  };
};

@Component({
  selector: 'app-user-settings-page',
  templateUrl: './user-settings-page.component.html',
  styleUrls: ['./user-settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsPageComponent implements OnInit, OnDestroy {
  public user!: UserData;

  public translateData!: TranslateUserSettingsPageModalData;

  private subscription!: Subscription;

  constructor(
    private userStateService: UserStateService,
    private userSettingsService: UserSettingsService,
    private dialog: MatDialog,
    private translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.subscription = this.userStateService.user$.subscribe((userData) => {
      if (userData) {
        this.user = userData;
      }
    });

    this.initTranslateDataObserver();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onDeleteClick(): void {
    const { title, description, confirmButtonText, rejectButtonText } =
      this.translateData.deleteUserDialog;
    // TODO:
    // * verification password
    const message = {
      title,
      description,
      confirmButtonText,
      rejectButtonText,
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

  private initTranslateDataObserver(): void {
    this.translateService
      .get('userSettingsPage')
      .pipe(first())
      .subscribe((res: TranslateUserSettingsPageModalData) => {
        this.translateData = res;
      });
    this.subscription.add(
      this.translateService.onLangChange
        .pipe(switchMap(() => this.translateService.get('userSettingsPage')))
        .subscribe((res: TranslateUserSettingsPageModalData) => {
          this.translateData = res;
        }),
    );
  }

  private confirmationUserPassword(): Observable<string> {
    const { titleText, confirmButtonText, rejectButtonText, inputPlaceholder } =
      this.translateData.confirmationPasswordDialog;
    const modalConfig = {
      password: '',
      confirmationTitleText: titleText,
      confirmationButtonText: confirmButtonText,
      rejectionButtonText: rejectButtonText,
      inputPlaceholder,
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
