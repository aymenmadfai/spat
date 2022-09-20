import { CUSTOM_ELEMENTS_SCHEMA,  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutsComponent } from './admin-layout.component';
import { NavbarModule } from 'src/app/core/navbar/navbar.module';
import { SidebarModule } from 'src/app/core/sidebar/sidebar.module';


@NgModule({
  declarations: [
    AdminLayoutsComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    NavbarModule,
    SidebarModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminLayoutModule { }
