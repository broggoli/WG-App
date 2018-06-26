import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

import { UserService } from "./_services"
import { AuthService } from "./_services"
import { UserService } from "./_services"

import { AuthGuard } from "./auth.guard"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
          path: "",
          component: HomeComponent

      },
      {
          path: "login",
          component: LoginComponent

      },
      {
          path: "admin",
          component: AdminComponent,
          canActivate: [AuthGuard]

      }])
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
