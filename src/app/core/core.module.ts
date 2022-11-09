import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserTokenService } from './services/user-token.service';
import { LanguageTogglerComponent } from './components/language-toggler/language-toggler.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [NotFoundComponent, LanguageTogglerComponent, HeaderComponent],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [UserTokenService],
  exports: [LanguageTogglerComponent, HeaderComponent],
})
export class CoreModule {}
