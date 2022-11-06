import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnDestroy {
  constructor(private http: HttpClient) {}

  SIGNUP_URL = 'http://localhost:4000/signup';

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

  sendSignupReq() {
    console.log('the signup request has been sent');
    return this.http.post(this.SIGNUP_URL, {
      name: this.user.value.name!,
      login: this.user.value.login!,
      password: this.user.value.password!,
    });
  }

  private signupSubscription!: Subscription;

  signup() {
    const request = this.sendSignupReq();
    this.signupSubscription = request.subscribe((x) => {
      console.log(x);
    });
  }
}
