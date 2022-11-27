import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserAuthenticationService } from 'src/app/core/services/user-auth.service';

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

  constructor(private userAuthService: UserAuthenticationService) {
    this.initFormStatusChangesObserver();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public logIn() {
    const { login, password } = this.user.value;
    if (login && password) {
      this.userAuthService.signIn({
        login,
        password,
      });
    }
  }

  private initFormStatusChangesObserver(): void {
    this.subscription = this.user.statusChanges.subscribe((status) => {
      this.buttonDisabled = status !== 'VALID';
    });
  }
}
