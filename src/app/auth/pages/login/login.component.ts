import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  user = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  public email = '';

  public password = '';

  @ViewChild('loginForm') loginForm!: ElementRef<HTMLFormElement>;

  @ViewChild('inputEmail') inputEmail!: ElementRef<HTMLInputElement>;

  @ViewChild('inputPassword') inputPassword!: ElementRef<HTMLInputElement>;

  loginCheck(email: string, password: string): void {
    if (email && password) {
      // this.authService.logIn(email);
      this.loginForm?.nativeElement.reset();
      this.inputEmail?.nativeElement.blur();
      this.inputPassword?.nativeElement.blur();
    }
  }
}
