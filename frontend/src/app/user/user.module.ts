import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
 

@NgModule({
  declarations: [SignupComponent, MainComponent, VerifyUserComponent, LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    RouterModule.forChild([
      {path:'',component:MainComponent,
      children:[
        {path:'',outlet:'signup',component:SignupComponent},
        {path:'',component:LoginComponent},
        {path:'forgot',component:ForgotPasswordComponent}]},
      ])
  ]
   
   
})
export class UserModule { }
