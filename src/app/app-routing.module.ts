import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { GuestGuard } from './core/guards/guest.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { RoutePaths } from './shared/constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePaths.boards,
    pathMatch: 'full',
  },
  {
    path: RoutePaths.welcome,
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
    canActivate: [GuestGuard],
    title: 'Welcome page',
  },
  {
    path: RoutePaths.userProfile,
    loadChildren: () =>
      import('./user-settings/user-settings.module').then(
        (m) => m.UserSettingsModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RoutePaths.boards,
    loadChildren: () =>
      import('./boards/boards.module').then((m) => m.BoardsModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not found page',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
