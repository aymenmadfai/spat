import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
@NgModule({
  declarations: [ConfirmationComponent, BreadcrumbComponent],
  imports: [
    CommonModule
  ],
  exports: [BreadcrumbComponent],

})
export class SharedModule { }
