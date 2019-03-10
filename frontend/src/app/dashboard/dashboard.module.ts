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

@NgModule({
  declarations: [AdminDashboardComponent, UserDashboardComponent, CreateMeetingComponent,   UpdateMeetingComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgbModalModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {path:'dashboard/admin',component:AdminDashboardComponent,
      children:[
        {path:'',component:CreateMeetingComponent},
      ]
    }
    ]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class DashboardModule { }
