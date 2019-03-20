import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { VerifyUserComponent } from './user/verify-user/verify-user.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
 
const routes: Routes = [
  { path: 'verify/:userId', component:VerifyUserComponent},
  { path: 'reset-password/:resetToken',component:ResetPasswordComponent},
  { path: 'error',component:InternalErrorComponent},
  { path: '',redirectTo:'/',pathMatch:'full' },
  { path: '*', component:NotFoundComponent },
  { path: '**', component:NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
