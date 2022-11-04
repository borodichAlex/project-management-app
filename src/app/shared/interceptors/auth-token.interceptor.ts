// eslint-disable-next-line max-classes-per-file
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

const UNAUTHORIZED_STATUS_CODE = 401;

class MockUserTokenService {
  // eslint-disable-next-line class-methods-use-this
  public getToken(): string {
    return 'access token';
  }
}

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private userTokenService: MockUserTokenService,
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
        if (error.status === UNAUTHORIZED_STATUS_CODE) {
          this.router.navigateByUrl('');

          return EMPTY;
        }

        return throwError(() => error);
      }),
    );
  }
}
