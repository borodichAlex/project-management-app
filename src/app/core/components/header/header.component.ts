import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  ConfirmationComponent,
  DialogData,
} from 'src/app/shared/components/confirmation/confirmation.component';
import { RoutePaths } from 'src/app/shared/constants';
import { UserData } from '../../interfaces/user.interface';
import { UserAuthenticationService } from '../../services/user-auth.service';
import { UserStateService } from '../../services/user-state.service';
import { BoardsService } from '../../../boards/services/boards.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userName!: string;

  public isAuthUser$!: Observable<boolean>;

  public subscription!: Subscription;

  constructor(
    private userAuthService: UserAuthenticationService,
    private userStateService: UserStateService,
    private router: Router,
    private matDialog: MatDialog,
    private CDRef: ChangeDetectorRef,
    private boardsService: BoardsService,
  ) {}

  public ngOnInit(): void {
    this.isAuthUser$ = this.userAuthService.isAuth$;
    this.initUserNameObserver();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onLogInClick() {
    this.router.navigate([RoutePaths.authPrefix + RoutePaths.login]);
  }

  public onSignUpClick() {
    this.router.navigate([RoutePaths.authPrefix + RoutePaths.signup]);
  }

  public onEditProfileClick() {
    this.router.navigate([RoutePaths.userProfile]);
  }

  public onLogoutClick() {
    const message = {
      title: 'Logout',
      description: 'Would you like to log out?',
    };
    this.logOutConfirmation(message).subscribe((isConfirm) => {
      if (isConfirm) {
        this.userAuthService.logout();
      }
    });
  }

  private logOutConfirmation(message: DialogData): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      data: message,
    });
    return dialogRef.afterClosed();
  }

  private initUserNameObserver(): void {
    this.subscription = this.userStateService.user$.subscribe(
      (user: UserData | null) => {
        if (user) {
          this.userName = user.name;
          this.CDRef.detectChanges();
        }
      },
    );
  }

  public onClickCreateBoard() {
    this.boardsService.createNewBoard();
  }
}
