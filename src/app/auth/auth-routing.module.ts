import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RoutePaths } from '../shared/constants';
import { GuestGuard } from '../core/guards/guest.guard';

const routes: Routes = [
  {
    path: RoutePaths.signup,
    component: SignupComponent,
    canActivate: [GuestGuard],
  },
  {
    path: RoutePaths.login,
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: RoutePaths.logout,
    component: LogoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
