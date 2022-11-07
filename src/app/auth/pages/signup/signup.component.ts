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
  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.signupSubscription.unsubscribe();
  }

  public user = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public buttonDisabled = true;

  private userSubscription: Subscription = this.user.statusChanges.subscribe(
    (status) => {
      this.buttonDisabled = status !== 'VALID';
    },
  );

  get name() {
    return this.user.get('name')!;
  }

  get login() {
    return this.user.get('login')!;
  }

  get password() {
    return this.user.get('password')!;
  }

  private signupSubscription!: Subscription;

  signUp() {
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
}
