import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { MeetingService } from 'src/app/services/meeting.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit{
  public receiverId: any;
  public receiverName: any;
  public authToken: any;
  public adminName: any;
  public meetingSubject: any;
  public description: any;
  public selectedUser: any;
  public userSelectedByAdmin: any;
  public startingDate: any;
  public endingDate: any;
  public meetingLocation: any;
  

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

      public sendMeetingCreateNotification(message):any{
        this.socketService.sendNotification(message);
      }

      

      public createNewMeeting(): any {

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
          let newMeeting = {
            subject: this.meetingSubject,
            adminId: this.receiverId,
            adminName:this.receiverName,
            userId:this.selectedUser.userId,
            userName:`${this.userSelectedByAdmin.firstName} ${this.userSelectedByAdmin.lastName}`,
            userEmail:this.selectedUser.email,
            startDate:this.startingDate.getTime(),
            description:this.description,
            endDate:this.endingDate.getTime(),
            location:this.meetingLocation
          }
         this.meetingService.createMeeting(newMeeting).subscribe((response) => {
            if(response.status == 200) {
                let notification = {
                  userId: newMeeting.userId,
                  message:`Admin ${newMeeting.adminName} scheduled a meeting for you.`
                }
                this.sendMeetingCreateNotification(notification);
                this.toastr.success('MEETING CREATED SUCCESSFULLY');
            }
              else {
                this.toastr.warning(`${response.message}`);
              }
            },
              (error) => {
                  this.toastr.error('INTERNAL SERVER ERROR');
                  this.router.navigate(['/error']);
            });
          }
        }
        

}
