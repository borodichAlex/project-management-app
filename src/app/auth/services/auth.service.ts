import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ITokenResponce } from 'src/app/core/services/types';
import { SERVER_URL, ENDPOINTS, RoutePaths } from 'src/app/shared/constants';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { UserTokenService } from 'src/app/core/services/user-token.service';
import { Router } from '@angular/router';
import { TBoard } from 'src/app/boards/interfaces/boards.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private userTokenService: UserTokenService,
    private router: Router,
  ) {}

  public signUp(name: string, login: string, password: string) {
    return this.http.post(`${SERVER_URL}/${ENDPOINTS.signup}`, {
      name,
      login,
      password,
    });
  }

  public signIn(login: string, password: string): Observable<ITokenResponce> {
    return this.http.post<ITokenResponce>(`${SERVER_URL}/${ENDPOINTS.signin}`, {
      login,
      password,
    });
  }

  public logOut(): void {
    const message = {
      title: 'Logout',
      description: 'Would you like to log out?',
    };
    this.logOutConfirmation(message).subscribe((result) => {
      if (result) {
        this.userTokenService.removeToken();
        this.router.navigate([RoutePaths.welcome]);
      }
    });
  }

  private logOutConfirmation(message: TBoard): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      data: message,
    });

    return dialogRef.afterClosed();
  }
}
