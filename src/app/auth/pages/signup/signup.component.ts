import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserAuthenticationService } from 'src/app/core/services/user-auth.service';
import { isLettNumbMix } from '../../validators/lettNumbMix';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  public user!: FormGroup;

  public hide = true;

  public buttonDisabled = true;

  private subscription!: Subscription;

  constructor(
    private userAuthService: UserAuthenticationService,
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.user = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: [
        '',
        [
          Validators.required,
          isLettNumbMix,
          Validators.pattern(/[^\p{L}\p{N}]/u),
          Validators.minLength(8),
        ],
      ],
    });
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
    if (
      this.user.controls['name'].hasError('required') ||
      this.user.controls['login'].hasError('required')
    ) {
      return 'You must enter a value';
    }

    return '';
  }

  public getPasswordErrorMessage(): string {
    let result = '';
    if (this.user.controls['password'].hasError('required')) {
      result = 'Please enter a password';
    } else if (this.user.controls['password'].hasError('lettNumbMix')) {
      result = "It's necessary a mixture of letters and numbers";
    } else if (this.user.controls['password'].hasError('pattern')) {
      result = "It's at least one special character, e.g., ! @ # ? ]";
    } else if (this.user.controls['password'].hasError('minlength')) {
      result = "It's necessary at least 8 characters";
    } else result = '';
    return result;
  }

  private initFormStatusChangesObserver(): void {
    this.subscription = this.user.statusChanges.subscribe((status) => {
      this.buttonDisabled = status !== 'VALID';
    });
  }
}
