import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [AdminDashboardComponent, UserDashboardComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
