import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: '',
    loadChildren: () =>
      import('./core/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'organisations',
    loadChildren: () =>
      import('./layouts/admin-layout/admin-layout.module').then(
        (l) => l.AdminLayoutModule
      ),
      canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
