import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef,OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { SocketService } from 'src/app/services/socket.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';

const colors: any = {
   blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  }};

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  //Functions and properties related to calendar view starts here.
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({event, newStart, newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

   
//Functions and properties related to calendar ends here.




//Function and properties related to user starts here.
public authToken: any;
public allMeetings: any;
public receiverId: any;
public receiverName: any;
public userInfo:any;
   
constructor(private modal: NgbModal,
  public socketService:SocketService,
  private toastr:ToastrService,
  public appService:AppService,
  public meetingService:MeetingService,
  public router:Router) {}


  ngOnInit() {
    this.receiverId = Cookie.get('receiverId');
    this.receiverName = Cookie.get('receiverName');
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.appService.getUserInfoFromLocalStorage();
    if(this.userInfo.userType === 'normal'){
      this.verifyUserUsingSocket();
      this.getMeetingsOfUser(this.receiverName,this.receiverId);
      this.handleSocketAuthError();
    }else{
      this.router.navigate(['/dashboard/admin']);
    }
    
  }
//User utility functions starts.
/**
 * function to log out user.
 */
public logOutUser():any{
  this.appService.logOut(this.authToken).subscribe((response)=>{
    if(response.status === 200){
      localStorage.clear();
       Cookie.delete('receiverId');
       Cookie.delete('receiverName');
       Cookie.delete('authToken');
       this.socketService.disconnectUser();
       this.socketService.exitSocket();
       setTimeout(()=>this.router.navigate(['/']),500);
    }else{
      this.toastr.warning(response.message.toUpperCase());
    }
},(err)=>{
      this.toastr.error('INTERNAL SERVER ERROR');
      this.router.navigate(['/error']);
  });
}//function to log out user ends.

/**
 * function to get all meeting of 
 * user.
 * @param userName F
 * @param userId 
 */
public getMeetingsOfUser(userName,userId):any{
  this.receiverName = userName;
  this.receiverId = userId;
  this.meetingService.getAllMeetingsOfUser(this.authToken,this.receiverId)
  .subscribe((response)=>{
    console.log(response);
          if(response.status === 200){
            this.allMeetings = response.data;
             this.allMeetings.forEach((meeting)=>{
                 meeting.subject = meeting.subject;
                 meeting.description = meeting.description;
                 meeting.start = new Date(meeting.startDate);
                 meeting.end = new Date(meeting.endDate);
                 meeting.color = colors.blue;
                 meeting.remindMe = true;
             });
             this.events = this.allMeetings;
             this.refresh.next();
             this.toastr.success('MEETINGS FOUND AND UPDATED');
          }else{
            this.toastr.warning(response.message.toUpperCase());
          }
     },(err)=>{
            this.toastr.error('INTERNAL SERVER ERROR');
            this.router.navigate(['/error']);
      });
   
}//function to get all meetings of user ends.

//User utility functions ends.


//Functions to handle events based tasks.
/**
 * Function to verify user using socket.
 */
public verifyUserUsingSocket():any{
  this.socketService.verifyUser().subscribe(()=>{
    this.socketService.setUser(this.authToken);
  });
}

/**
 * Function to handle error,if 
 * user is not verified using socket.
 */
public handleSocketAuthError():any{
  this.socketService.authError().subscribe(()=>{
    this.toastr.warning('AUTHORIZATION FAILED');
    this.logOutUser();
  });
}
//Handle events based function Ends here.
  
//Function and properties related to user ends here.
   

}
