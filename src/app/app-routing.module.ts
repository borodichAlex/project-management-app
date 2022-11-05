import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { NotAuthGuard } from './core/guards/not-auth.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { ROUTEPATHS } from './shared/constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTEPATHS.boards,
    pathMatch: 'full',
  },
  {
    path: ROUTEPATHS.welcome,
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
    canActivate: [NotAuthGuard],
  },
  {
    path: ROUTEPATHS.boards,
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
