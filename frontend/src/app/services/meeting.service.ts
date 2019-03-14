import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  public baseUrl : string = "http://localhost:3000/api/v1";
  constructor(private http:HttpClient) { }


  public deleteMeeting(authToken,meetingId):Observable<any>{
     const params = new HttpParams()
     .set('authToken',authToken);
     return this.http.post(`${this.baseUrl}/meeting/delete/${meetingId}`,params);
  }

  public getAllMeetingsOfUser(authToken,userId):Observable<any>{
     return  this.http.get(`${this.baseUrl}/meetings/view/all/${userId}?authToken=${authToken}`);
  }
}
