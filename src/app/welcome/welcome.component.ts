import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from '../core/services/logging.service';
import { ROUTES } from '../shared/constants';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  constructor(private loggingService: LoggingService, private router: Router) {}

  public onLogInClick() {
    this.router.navigate([ROUTES.login]);
    console.log('redirect to login');
  }

  public onSignUpClick() {
    this.router.navigate([ROUTES.signup]);
    console.log('redirect to sign up');
  }
}
