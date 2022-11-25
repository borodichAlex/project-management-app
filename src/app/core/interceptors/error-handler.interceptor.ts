import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GATEWAY_TIMEOUT_ERROR } from 'src/app/shared/constants';
import { ErrorDialogService } from '../services/error-dialog.service';
import { IData } from '../services/types';
import { UserAuthenticationService } from '../services/user-auth.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private errorDialogService: ErrorDialogService,
    private authService: UserAuthenticationService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let data: IData;
        if (error && error.status === GATEWAY_TIMEOUT_ERROR) {
          data = {
            reason: 'No answer from server',
            status: error.status,
          };
          // this.authService.logout();
        } else {
          data = {
            reason:
              error && error.error.message
                ? error.error.message
                : 'Unknown error',
            status: error.status,
          };
        }
        this.errorDialogService.openDialog(data);
        return EMPTY;
      }),
    );
  }
}
