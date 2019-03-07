import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';

@NgModule({
  declarations: [CreateMeetingComponent, UpdateMeetingComponent],
  imports: [
    CommonModule
  ]
})
export class MeetingModule { }
