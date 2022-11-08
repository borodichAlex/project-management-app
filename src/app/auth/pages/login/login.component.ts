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
  public hide = true;

  public buttonDisabled = true;

  public user = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public get login() {
    return this.user.get('login')!;
  }

  public get password() {
    return this.user.get('password')!;
  }

  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private userTokenService: UserTokenService,
    private router: Router,
  ) {
    this.initFormStatusChangesObserver();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public logIn() {
    const { login, password } = this.user.value;
    const request = this.authService.signIn(login!, password!);
    this.subscription.add(
      request.subscribe((x) => {
        this.userTokenService.setToken(x.token);
        this.router.navigate([RoutePaths.boards]);
      }),
    );
  }

  private initFormStatusChangesObserver(): void {
    this.subscription = this.user.statusChanges.subscribe((status) => {
      this.buttonDisabled = status !== 'VALID';
    });
  }
}
