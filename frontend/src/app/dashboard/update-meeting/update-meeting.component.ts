import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MeetingService } from 'src/app/services/meeting.service';
import { SocketService } from 'src/app/services/socket.service';
import { Cookie } from 'ng2-cookies';
import { UserModule } from 'src/app/user/user.module';

@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.css']
})
export class UpdateMeetingComponent implements OnInit {
  public receiverId: string;
  public receiverName: string;
  public authToken: string;
  public adminName: string;
  public meetingSubject: any;
  public description: any;
  public startingDate: any;
  public endingDate: any;
  public meetingLocation: any;
  public meetingId: any;
  public userMeeting: any;
  public userId: any;
  public subject: any;
  public location: any;
  public userName: any;
   

  constructor(private router: Router,
    private toastr:ToastrService,
    public meetingService:MeetingService,
    public socketService:SocketService) { 
    console.log('meeting called.');
  }

  ngOnInit() {
    this.receiverId = Cookie.get('receiverId');
    this.receiverName = Cookie.get('receiverName');
    this.authToken = Cookie.get('authToken');
    this.adminName = Cookie.get('receiverName');
  }

  public updateUserMeeting(): any {
    if (!this.meetingSubject) {
      this.toastr.warning("PLEASE ENTER MEETING SUBJECT");
    }
    else if (!this.description) {
      this.toastr.warning("PLEASE ENTER MEETING DESCRIPTION");
    }else if (!this.startingDate) {
      this.toastr.warning("PLEASE ENTER MEETING START DATE");
    }
    else if (!this.endingDate) {
      this.toastr.warning("PLEASE ENTER MEETING END DATE");
    }
    else if (!this.meetingLocation) {
      this.toastr.warning("PLEASE ENTER MEETING LOCATION");
    }
    else if (this.meetingService.checkStartDateAndEndDate(this.startingDate ,this.endingDate)) {
      this.toastr.warning("PLEASE ENTER VALID MEETING START/END TIME");
    }
    else if (this.meetingService.checkCurrentAndMeetingDates(this.startingDate) 
             && this.meetingService.checkCurrentAndMeetingDates(this.endingDate)) {
      this.toastr.warning("ENTERD TIME HAS BEEN PASSED");
    }
    else {
      let meeting = {
        meetingId:this.meetingId,
        subject: this.meetingSubject,
        startDate:this.startingDate.getTime(),
        description:this.description,
        endDate:this.endingDate.getTime(),
        location:this.meetingLocation
      }
     this.meetingService.updateMeeting(meeting)
     .subscribe((response) => {
        if(response.status == 200) {
            let notification = {
              userId: this.userMeeting.userId,
              message:`Admin ${this.userMeeting.adminName} updated meeting ${this.userMeeting.subject}.`
            }
            this.sendMeetingUpdateNotification(notification);
            this.toastr.success('MEETING UPDATED SUCCESSFULLY');
        }
          else {
            this.toastr.warning(`${response.message}`);
          }
        },(err) => {
              this.toastr.error('INTERNAL SERVER ERROR');
              this.router.navigate(['/error']);
        });
      }
    }

    public sendMeetingUpdateNotification(message):any{
      this.socketService.sendNotification(message);
    }
  

  public getUserMeeting(meetingId){ 
     this.meetingService.getMeeting(meetingId,this.authToken)
     .subscribe((response) => {
        if (response.status == 200) {
          this.userMeeting = response.data;
          this.toastr.info("USER MEETING FOUND");

          this.userId = this.userMeeting.userId
          this.subject = this.userMeeting.subject;
          this.location = this.userMeeting.meetingLocation;
          this.userName = this.userMeeting.userName; 
          this.description = this.userMeeting.meetingDescription;
          this.startingDate = new Date(this.userMeeting.startingDate);
          this.endingDate = new Date(this.userMeeting.endingDate);         
        }
        else {
          this.toastr.warning(response.message.toUpperCase());
        }
      },
      (err) => {
         this.toastr.error("INTERNAL SERVER ERROR");
          this.router.navigate(['/error']);
      }
    );
  }

}
