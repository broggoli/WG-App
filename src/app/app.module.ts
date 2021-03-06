import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import {    FormsModule,
            ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

import { UserService } from "./_services"
import { AuthService } from "./_services"

import { AuthGuard } from "./auth.guard";
import { NewOrJoinComponent } from './new-or-join/new-or-join.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddFlatMatesComponent } from './add-flat-mates/add-flat-mates.component';
import { EnterCodeComponent } from './enter-code/enter-code.component';
import { FlatRegisterComponent } from './flat-register/flat-register.component';
import { AddReceiptItemComponent } from './add-receipt-item/add-receipt-item.component';
import { PurchasesComponent } from './purchases/purchases.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    LogoutComponent,
    RegisterComponent,
    NewOrJoinComponent,
    RegisterUserComponent,
    AddFlatMatesComponent,
    EnterCodeComponent,
    FlatRegisterComponent,
    AddReceiptItemComponent,
    PurchasesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
        {
            path: "",
            component: LoginComponent

        },
        {
            path: "register",
            component: RegisterComponent

        },
        {
            path: "logout",
            component: LogoutComponent

        },
        {
            path: "home",
            component: HomeComponent,
            canActivate: [AuthGuard]

        }])
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
