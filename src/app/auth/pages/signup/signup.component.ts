import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserAuthenticationService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnDestroy {
  public hide = true;

  public buttonDisabled = true;

  public user = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public get name() {
    return this.user.get('name')!;
  }

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

  public signUp() {
    const { name, login, password } = this.user.value;

    if (name && login && password) {
      this.userAuthService.signUp({
        name,
        login,
        password,
      });
    }
  }

  public getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  private initFormStatusChangesObserver(): void {
    this.subscription = this.user.statusChanges.subscribe((status) => {
      this.buttonDisabled = status !== 'VALID';
    });
  }
}
