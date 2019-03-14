import { Component,ViewChild,TemplateRef,OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView } from 'angular-calendar';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { MeetingService } from 'src/app/services/meeting.service';
import { AppService } from 'src/app/services/app.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/services/socket.service';

const colors: any = {
   
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  green: {
    primary: '#008000',
    secondary: '#FAE3E3'
  }
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  

})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalReminder') modalReminder: TemplateRef<any>;
  @ViewChild('modalDeleteMeeting') modalDeleteMeeting: TemplateRef<any>;
  refresh: Subject<any> = new Subject();

  view: string = 'month';
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  /*events: CalendarEvent[] = [
    {
      title: 'Resizable event',
      color: colors.yellow,
      start: new Date(),
      end: addDays(new Date(), 1), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true
      }
    },
    {
      title: 'A non resizable event',
      color: colors.blue,
      start: new Date(),
      end: addDays(new Date(), 1)
    }
     
  ];*/


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
   
  
  public userName: any;
  public userId: any;
  public activeDayIsOpen: boolean = true;
  public receiverName: any;
  public receiverId: any;
  public authToken: any;
  public userInfo: any;
   
  public userList : any = []
  public allMeetings: any = [];
  public allUsersList: any = [];
  public allOnlineUsersList: any = [];
  public events: CalendarEvent[] = [];
  adminId: any;

  constructor(private modal: NgbModal,
              private toastr:ToastrService,
              private router: Router,
              public meetingService:MeetingService,
              public appService:AppService,
              public socketService:SocketService) {}

 

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

  eventTimesChanged({
    event,
    newStart,
    newEnd
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

   
/*************************************************************************************** */


ngOnInit() {
  this.receiverId = Cookie.get('receiverId');
  this.receiverName = Cookie.get('receiverName');
  this.authToken = Cookie.get('authToken');
  this.adminId = this.receiverId;
  this.verifyUserUsingSocket();
  this.getAllUsersForAdmin();
  this.getOnlineUsers();
   
  this.handleSocketAuthError();

  

}

public getMeetingOfClickedUser():any{

}


public getAllUsersForAdmin():any{
  this.appService.getAllUsers(this.authToken).subscribe((response)=>{
    console.log(response);
    if(response.status === 200){
      this.allUsersList = response.data;
      console.log(this.allUsersList);
    }else{
      this.toastr.warning(response.message.toUpperCase());
    }
  },(err)=>{
      this.toastr.error('INTERNAL SERVER ERROR');
      this.router.navigate(['/error']);
  });
}


public deleteUserMeeting(meeting):any{
   this.meetingService.deleteMeeting(this.authToken,meeting.meetingId)
   .subscribe((response)=>{
      if(response.status === 200){
        this.toastr.success('MEETINGS DELETED SUCCESSFULLY');
      }else{
        this.toastr.warning(response.message.toUpperCase());
      }
   },(err)=>{
        this.toastr.error('INTERNAL SERVER ERROR');
        this.router.navigate(['/error']);
   });
}

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
                 meeting.actions = this.actions;
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
   
}


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
}


/**
 * Function related to socket
 */

public getOnlineUsers():any{
  this.socketService.onlineUsersList().subscribe((usersList)=>{
      usersList.forEach((user)=>{
        this.allOnlineUsersList.push(user);
      }); 
      this.allUsersList.forEach((user)=>{
         (this.allOnlineUsersList.includes(user.userId))? user.status = 'online':user.status = 'offline';
      });
  });
}



public verifyUserUsingSocket():any{
  this.socketService.verifyUser().subscribe(()=>{
    this.socketService.setUser(this.authToken);
  });
}


public handleSocketAuthError():any{
  this.socketService.authError().subscribe(()=>{
    this.toastr.warning('AUTHORIZATION FAILED');
    this.logOutUser();
  });
}

}
