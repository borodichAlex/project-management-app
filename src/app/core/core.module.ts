import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserTokenService } from './services/user-token.service';
import { LanguageTogglerComponent } from './language-toggler/language-toggler.component';

@NgModule({
  declarations: [NotFoundComponent, LanguageTogglerComponent],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserTokenService],
  exports: [LanguageTogglerComponent],
})
export class CoreModule {}
