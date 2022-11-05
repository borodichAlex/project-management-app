import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  public user = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    button: new FormControl(),
  });

  public buttonDisabled = true;

  private _subscription = this.user.statusChanges.subscribe((status) => {
    if (status === 'VALID') this.buttonDisabled = !this.buttonDisabled;
    else this.buttonDisabled = true;
  });

  get name() {
    return this.user.get('name')!;
  }

  get login() {
    return this.user.get('login')!;
  }

  get password() {
    return this.user.get('password')!;
  }
}
