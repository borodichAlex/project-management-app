import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public user = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

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

  public sendRequest() {
    const token = window.localStorage.getItem('testt') || '';
    console.log(this.buttonDisabled);
    console.log(token);
  }
}
