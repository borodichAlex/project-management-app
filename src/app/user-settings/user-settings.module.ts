/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

import { UserSettingsRoutingModule } from './user-settings-routing.module';

import { UserSettingsService } from './services/user-settings.service';

import { UserSettingsPageComponent } from './pages/user-settings-page.component';
import { UserGeneralFormComponent } from './components/user-general-form/user-general-form.component';
import { UserEditFieldWrapperComponent } from './components/user-edit-field-wrapper/user-edit-field-wrapper.component';
import { ConfirmationDialogPasswordComponent } from './components/confirmation-dialog-password/confirmation-dialog-password.component';

@NgModule({
  declarations: [
    UserSettingsPageComponent,
    UserGeneralFormComponent,
    UserEditFieldWrapperComponent,
    ConfirmationDialogPasswordComponent,
  ],
  imports: [
    CommonModule,
    UserSettingsRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatDialogModule,
  ],
  providers: [UserSettingsService],
})
export class UserSettingsModule {}
