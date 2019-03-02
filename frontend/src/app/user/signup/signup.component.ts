import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName:any;
  public lastName:any;
  public email:any;
  public userName:any;
  public mobile:any;
  public password:any;
  public isProcessing = false;
  public countryCallingCode:any;
  public countriesList:any = [{
    countryName:'India',
    callingCode:'+91'
  }];
   
  constructor(public http:HttpClient,private toastr:ToastrService) { }

  ngOnInit() {
   
    this.http.get('https://restcountries.eu/rest/v2/all?fields=callingCodes;name')
    .subscribe((response:any)=>{
       this.countriesList = response.map(data=>{
         return {
           countryName: data.name,
           callingCode: '+' + data.callingCodes[0]
         }
       });
       this.countryCallingCode = this.countriesList[0].callingCode;
    });
  }

  public selectCountry:any = (value)=>{
    this.countryCallingCode = value;
    console.log(this.countryCallingCode);
  }



  public onSubmit:any = ()=>{
    if(!this.isProcessing){
      let newUser = {
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        userName:this.userName,
        mobile:this.mobile,
        password:this.password
      }
    }
    this.toastr.error('Some error occured.');
  }
 
  
}
