import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserTokenService } from '../../services/user-token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public userName!: string;

  constructor(public userToken: UserTokenService) {}

  ngOnInit(): void {
    this.userName = 'username!!';
  }

  public onEditProfileClick() {
    console.log(`Edit user ${this.userName}`);
    // router.navigate(RoutePaths.edit);
  }

  public onLogoutClick() {
    console.log(`Logout user ${this.userName}`);
    // this.auth.logout();
  }
}
