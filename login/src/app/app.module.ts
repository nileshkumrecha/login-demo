import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRouterModule, routingComponents } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationService } from './_services/authentication/authentication.service';
import { AuthGuard } from './_guards/authGuards';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './common/create-new-password/create-new-password.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CreateNewPasswordComponent
  ],
  imports: [
    BrowserModule,
    appRouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
