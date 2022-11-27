import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePaths } from '../shared/constants';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  public onLogInClick() {
    this.router.navigate([RoutePaths.authPrefix + RoutePaths.login]);
  }

  public onSignUpClick() {
    this.router.navigate([RoutePaths.authPrefix + RoutePaths.signup]);
  }

  public forceNavigate() {
    this.router.navigate(['/welcome'], {
      fragment: 'aboutteam',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public scroll() {
    const elmnt = document.getElementById('aboutteam') as HTMLElement;
    elmnt.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
