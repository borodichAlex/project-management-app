import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public user = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    button: new FormControl(),
  });

  public buttonDisabled = true;

  private _subscription = this.user.statusChanges.subscribe((status) => {
    if (status === 'VALID') this.buttonDisabled = !this.buttonDisabled;
    else this.buttonDisabled = true;
  });

  get login() {
    return this.user.get('login')!;
  }

  get password() {
    return this.user.get('password')!;
  }
}
