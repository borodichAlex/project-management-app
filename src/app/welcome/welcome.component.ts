import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTEPATHS } from '../shared/constants';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  public onLogInClick() {
    this.router.navigate([ROUTEPATHS.login]);
    console.log('redirect to login');
  }

  public onSignUpClick() {
    this.router.navigate([ROUTEPATHS.signup]);
    console.log('redirect to sign up');
  }
}
