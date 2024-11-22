import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsPageComponent } from './pages/user-settings-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserSettingsPageComponent,
    title: 'User profile',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingsRoutingModule {}
