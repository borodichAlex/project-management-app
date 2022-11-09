import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserTokenService } from './services/user-token.service';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';

@NgModule({
  declarations: [NotFoundComponent, ErrorDialogComponent],
  imports: [CommonModule, TranslateModule],
  providers: [
    UserTokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
