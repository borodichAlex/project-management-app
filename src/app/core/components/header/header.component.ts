import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  ConfirmationComponent,
  DialogData,
} from 'src/app/shared/components/confirmation/confirmation.component';
import { RoutePaths } from 'src/app/shared/constants';
import { UserData } from '../../interfaces/user.interface';
import { UserAuthenticationService } from '../../services/user-auth.service';
import { UserStateService } from '../../services/user-state.service';

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

  public showBigButtons = new BehaviorSubject<boolean>(false);

  constructor(
    private userAuthService: UserAuthenticationService,
    private userStateService: UserStateService,
    private router: Router,
    private matDialog: MatDialog,
    private CDRef: ChangeDetectorRef,
    public breakpointObserver: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private translatePipe: TranslatePipe,
  ) {
    this.matIconRegistry.addSvgIcon(
      'login-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/log-in.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'signup-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/add-user.svg',
      ),
    );
  }

  public ngOnInit(): void {
    this.isAuthUser$ = this.userAuthService.isAuth$;
    this.initUserNameObserver();
    this.breakpointObserver
      .observe(['(min-width: 769px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showBigButtons.next(true);
        } else {
          this.showBigButtons.next(false);
        }
      });
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
      title: this.translatePipe.transform('header.logout'),
      description: this.translatePipe.transform(
        'header.Would you like to log out?',
      ),
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
}
