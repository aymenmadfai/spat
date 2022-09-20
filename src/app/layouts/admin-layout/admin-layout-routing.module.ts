import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/service/auth-guard.service';
import { AdminLayoutsComponent } from './admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
      path: '',
      loadChildren: () => import('../../module/organisations/organisations/organisations.module')
      .then((c) => c.OrganisationsModule),
      canActivate: [AuthGuardService]
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
