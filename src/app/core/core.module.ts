import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { UserStateService } from './services/user-state.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { LanguageTogglerComponent } from './components/language-toggler/language-toggler.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    LanguageTogglerComponent,
    HeaderComponent,
    ErrorDialogComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [
    UserStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  exports: [LanguageTogglerComponent, HeaderComponent],
})
export class CoreModule {}
