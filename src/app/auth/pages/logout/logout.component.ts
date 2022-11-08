import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/shared/constants';
import { UserTokenService } from '../../../core/services/user-token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent implements OnInit {
  public buttonDisabled = true;

  constructor(
    private userTokenService: UserTokenService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.buttonDisabled = !this.userTokenService.isLoggedIn$.value;
  }

  public logOut() {
    this.userTokenService.removeToken();
    this.router.navigate([RoutePaths.welcome]);
  }

  public close() {
    this.router.navigate([RoutePaths.boards]);
  }
}
