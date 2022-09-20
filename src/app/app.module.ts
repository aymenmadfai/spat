import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfigService, ConfigModule } from './core/service/config.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './core/login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganisationsComponent } from './module/organisations/organisations/organisations.component';
import { FormsModule } from '@angular/forms';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input-angular-13';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    NgbModule,
    FormsModule,
    NoopAnimationsModule,
    NgxMatIntlTelInputModule
  ],
  providers: [ConfigService, ConfigModule.init()],
  bootstrap: [AppComponent]
})
export class AppModule { }
