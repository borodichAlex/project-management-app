import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RoutePaths } from 'src/app/shared/constants';
import { UserStateService } from '../../services/user-state.service';
import { UserTokenService } from '../../services/user-token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public userName!: string;

  constructor(
    public userToken: UserTokenService,
    private auth: AuthService,
    private userState: UserStateService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    // this.userName = this.userState.user.name;
    this.userName = '@USERNAME';
  }

  public onLogInClick() {
    this.router.navigate([RoutePaths.authPrefix + RoutePaths.login]);
  }

  public onSignUpClick() {
    this.router.navigate([RoutePaths.authPrefix + RoutePaths.signup]);
  }

  public onEditProfileClick() {
    console.log(`Edit user ${this.userName}`);
    // call editProfile modal window / component
  }

  public onLogoutClick() {
    this.auth.logOut();
  }
}
