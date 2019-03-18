import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  public baseUrl : string = "http://localhost:3000/api/v1";

  private user = new BehaviorSubject('');
  currentUser = this.user.asObservable();

  constructor(private http:HttpClient) { }

  public changeUser(user:any):any{
    console.log('change user calleds');
    console.log(user);
    this.user.next(user);
  }

  public checkStartDateAndEndDate(startingDate:any,endingDate:any):boolean{
    if(new Date(startingDate) > new Date(endingDate)){
       return true;
    }
    return false;
  }

  public checkCurrentAndMeetingDates(startingDate:any):boolean{
    if(new Date() > new Date(startingDate)){
       return true;
    }
    return false;
  }
  
  public getMeeting(meetingId,authToken):Observable<any>{
    return this.http.get(`${this.baseUrl}/meetings/details/${meetingId}?authToken=${authToken}`);
 }

  public deleteMeeting(authToken,meetingId):Observable<any>{
     const params = new HttpParams()
     .set('authToken',authToken);
     return this.http.post(`${this.baseUrl}/meetings/delete/${meetingId}`,params);
  }

  public getAllMeetingsOfUser(authToken,userId):Observable<any>{
     return  this.http.get(`${this.baseUrl}/meetings/view/all/${userId}?authToken=${authToken}`);
  }

  public createMeeting(data):Observable<any>{
   
    const params = new HttpParams()
     .set('subject',data.subject)
     .set('adminId',data.adminId)
     .set('adminName',data.adminName)
     .set('userId',data.userId)
     .set('userName',data.userName)
     .set('userEmail',data.userEmail)
     .set('startDate',data.startDate)
     .set('description',data.description)
     .set('endDate',data.endDate)
     .set('authToken',data.authToken)
     .set('location',data.location);
    return this.http.post(`${this.baseUrl}/meetings/create`,params);
  }

  public updateMeeting(data):Observable<any>{
   const params = new HttpParams()
    .set('subject', data.meetingTopic)
    .set('startDate',data.meetingStartDate)
    .set('endDate',data.meetingEndDate)
    .set('description',data.meetingDescription)
    .set('location',data.meetingPlace)
    .set('authToken',data.authToken);
    return this.http.post(`${this.baseUrl}/meetings/update`,params);
  }
}
