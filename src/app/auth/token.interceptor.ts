import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // IN Swagger need:
  // 1. signup user
  // 2. signin user
  // 3. Copy token in signin response
  // 4. Change copied token (step 3) to mockToken
  private mockToken: string =
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNTk3YTJlYi1hZmY0LTQ1MGEtYWQ4OC1mZGRhYTMwM2VmNzkiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NjczOTEzMTd9.IYKpALv9PAtNGNUOnzwSvUoGbTkr_y8H6VducIcgvDQ';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.mockToken}`,
      },
    });
    return next.handle(newRequest);
  }
}
