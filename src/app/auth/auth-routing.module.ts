import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { RoutePaths } from '../shared/constants';
import { GuestGuard } from '../core/guards/guest.guard';

const routes: Routes = [
  {
    path: RoutePaths.signup,
    component: SignupComponent,
    canActivate: [GuestGuard],
    title: 'Signup',
  },
  {
    path: RoutePaths.login,
    component: LoginComponent,
    canActivate: [GuestGuard],
    title: 'Login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
