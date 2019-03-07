import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalErrorComponent } from './internal-error/internal-error.component';
import { CreateMeetingComponent } from './meeting/create-meeting/create-meeting.component';
import { UpdateMeetingComponent } from './meeting/update-meeting/update-meeting.component';

const routes: Routes = [
  { path: 'dashboard/admin',component:AdminDashboardComponent},
  { path: 'dashboard/user',component:UserDashboardComponent},
  { path: 'meeting/create',component:CreateMeetingComponent},
  { path: 'meeting/update',component:UpdateMeetingComponent},
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
