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
import { ErrorDialogService } from '../services/error-dialog.service';
import { IData } from '../services/types';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private errorDialogService: ErrorDialogService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const loginErrorMessage = 'Login or password is incorrect';
        const backendMessage = 'User was not founded!';
        const data: IData = {
          reason:
            error && error.error.message !== backendMessage
              ? error.error.message
              : loginErrorMessage,
          status: error.status,
        };
        this.errorDialogService.openDialog(data);
        return EMPTY;
      }),
    );
  }
}
