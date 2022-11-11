import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingsPageComponent } from './pages/user-settings-page.component';
// eslint-disable-next-line max-len
import { UserGeneralFormComponent } from './components/user-general-form/user-general-form.component';
// eslint-disable-next-line max-len
import { UserEditFieldWrapperComponent } from './components/user-edit-field-wrapper/user-edit-field-wrapper.component';

@NgModule({
  declarations: [
    UserSettingsPageComponent,
    UserGeneralFormComponent,
    UserEditFieldWrapperComponent,
  ],
  imports: [
    CommonModule,
    UserSettingsRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
})
export class UserSettingsModule {}
