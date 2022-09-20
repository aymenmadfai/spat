import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationsRoutingModule } from './organisations-routing.module';
import { OrganisationsComponent } from './organisations.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { AddOrganizationComponent } from '../add-organization/add-organization.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input-angular-13'
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddAccountComponent } from '../add-account/add-account.component';

@NgModule({
  declarations: [OrganisationsComponent, AddOrganizationComponent, AddAccountComponent],
  imports: [
    CommonModule,
    OrganisationsRoutingModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    StepsModule,
   MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMatIntlTelInputModule
    
   
  ],
  providers: [MessageService],
})
export class OrganisationsModule {}
