import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { UserTokenService } from '../services/user-token.service';
import { UserAuthenticationService } from '../services/user-auth.service';

const UNAUTHORIZED_STATUS_CODE = 401;
const ZERO_STATUS_CODE = 0;

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(
    private userTokenService: UserTokenService,
    private authService: UserAuthenticationService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let authRequest;

    const token = this.userTokenService.getToken();

    if (token) {
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      authRequest = request.clone();
    }

    return next
      .handle(authRequest)
      .pipe((source) => this.handleAuthErrors(source));
  }

  private handleAuthErrors(
    source: Observable<HttpEvent<unknown>>,
  ): Observable<HttpEvent<unknown>> {
    return source.pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === UNAUTHORIZED_STATUS_CODE ||
          error.status === ZERO_STATUS_CODE
        ) {
          this.authService.logout();
          return EMPTY;
        }

        return throwError(() => error);
      }),
    );
  }
}
