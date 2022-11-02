import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { ROUTES } from './shared/constants';

const routes: Routes = [
  {
    path: ROUTES.welcome,
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: ROUTES.notfound,
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: ROUTES.notfound,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
