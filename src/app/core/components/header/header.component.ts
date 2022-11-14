import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
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
  ) {}

  public ngOnInit(): void {
    // this.userName = this.userState.user.name;
    this.userName = '@USERNAME';
  }

  public onEditProfileClick() {
    console.log(`Edit user ${this.userName}`);
    // call editProfile modal window / component
  }

  public onLogoutClick() {
    this.auth.logOut();
  }
}
