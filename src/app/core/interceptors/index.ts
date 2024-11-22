import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './auth-token.interceptor';

const addInterceptor = <T>(interceptor: T) => ({
  provide: HTTP_INTERCEPTORS,
  useClass: interceptor,
  multi: true,
});

export const httpInterceptorProviders = [addInterceptor(AuthTokenInterceptor)];
