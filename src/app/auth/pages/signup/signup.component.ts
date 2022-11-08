import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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

  private userSubscription: Subscription = this.user.statusChanges.subscribe(
    (status) => {
      this.buttonDisabled = status !== 'VALID';
    },
  );

  private signupSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.signupSubscription.unsubscribe();
  }

  public signUp() {
    const request = this.authService.signUp(
      this.user.value.name!,
      this.user.value.login!,
      this.user.value.password!,
    );
    this.signupSubscription = request.subscribe(() => {
      this.authService.signIn(
        this.user.value.login!,
        this.user.value.password!,
      );
    });
  }

  public getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
