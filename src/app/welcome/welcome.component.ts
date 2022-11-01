import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from '../core/services/logging.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  constructor(private loggingService: LoggingService, private router: Router) {}

  // eslint-disable-next-line class-methods-use-this
  public onLogIn() {
    // this.router.navigate(['login']); //for production
    this.loggingService.logIn('user1', '123456'); // for debugging
    // eslint-disable-next-line no-console
    console.log('redirect to login');
  }

  // eslint-disable-next-line class-methods-use-this
  public onSignUp() {
    // this.router.navigate(['login']); //for production
    // eslint-disable-next-line no-console
    console.log('redirect to sign up');
  }
}
