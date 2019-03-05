import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './user/main/main.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';

const routes: Routes = [
  { path:'/',component:MainComponent},
  { path: 'dashboard/admin',component:AdminDashboardComponent},
  { path: 'dashboard/user',component:UserDashboardComponent},
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
