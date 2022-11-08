import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/shared/constants';
import { AuthService } from '../../services/auth.service';
import { UserTokenService } from '../../../core/services/user-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private userTokenService: UserTokenService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.signinSubscription.unsubscribe();
  }

  public user = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public hide = true;

  public buttonDisabled = true;

  private subscription = this.user.statusChanges.subscribe((status) => {
    this.buttonDisabled = status !== 'VALID';
  });

  get login() {
    return this.user.get('login')!;
  }

  get password() {
    return this.user.get('password')!;
  }

  private signinSubscription!: Subscription;

  public logIn() {
    const request = this.authService.signIn(
      this.user.value.login!,
      this.user.value.password!,
    );
    this.signinSubscription = request.subscribe((x) => {
      this.userTokenService.setToken(x.token);
      this.router.navigate([RoutePaths.boards]);
    });
  }
}
