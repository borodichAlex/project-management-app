import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UserStateService } from './services/user-state.service';
import { UsersApiService } from './services/users-api.service';
import { UserAuthenticationService } from './services/user-auth.service';

import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { LanguageTogglerComponent } from './components/language-toggler/language-toggler.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    LanguageTogglerComponent,
    HeaderComponent,
    ErrorDialogComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
  ],
  providers: [
    UserStateService,
    UsersApiService,
    UserAuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
  exports: [LanguageTogglerComponent, HeaderComponent, FooterComponent],
})
export class CoreModule {}
