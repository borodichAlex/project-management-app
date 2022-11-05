import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public user = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public buttonDisabled = true;

  private subscription = this.user.statusChanges.subscribe((status) => {
    this.buttonDisabled = status !== 'VALID';
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
