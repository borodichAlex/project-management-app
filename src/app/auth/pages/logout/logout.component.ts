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
  constructor(
    private userTokenService: UserTokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buttonDisabled = !this.userTokenService.isLoggedIn$.value;
  }

  public buttonDisabled = true;

  public logOut() {
    this.userTokenService.removeToken();
    this.router.navigate([RoutePaths.welcome]);
  }

  public close() {
    this.router.navigate([RoutePaths.boards]);
  }
}
