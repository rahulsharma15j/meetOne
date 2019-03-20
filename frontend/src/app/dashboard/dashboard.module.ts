import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
 
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';
import { RouterModule } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AppRouteGuard } from '../services/app-route.guard';

 
 
 


@NgModule({
  declarations: [AdminDashboardComponent, UserDashboardComponent, CreateMeetingComponent,   UpdateMeetingComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgbModalModule,
    FormsModule,
    SharedModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild([
      { path: 'dashboard/user',component:UserDashboardComponent,canActivate:[AppRouteGuard,UserRouteGuard]},
      {path:'dashboard/admin',component:AdminDashboardComponent,
      canActivate:[AppRouteGuard,AdminRouteGuard],
      children:[
        {path:'',component:CreateMeetingComponent},
      ]
    }
    ]),
    
  ],
  providers:[AppRouteGuard]
})
export class DashboardModule { }
