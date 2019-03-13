import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:any;
  public userName:any;
  public password:any;

  constructor( 
    private toastr:ToastrService,
    public appService:AppService,
    private router:Router) { console.log('login called')}

  ngOnInit() {
  }
  
  public logInUser():any{
    let user = {};
    if(!this.email){
      this.toastr.warning('PLEASE ENTER YOUR EMAIL OR USERNAME');
    }else if(!this.password){
      this.toastr.warning('PLEASE ENTER YOUR PASSWORD');
    }else if(!this.appService.validatePassword(this.password)){
      this.toastr.warning('PASSWORD LENGTH 8 REQUIRED');
    }else{
      
      (this.appService.validateEmail(this.email))?user['email'] = this.email:user['userName']=this.email;
      user['password'] = this.password;
      
      this.appService.logIn(user).subscribe((response)=>{
         if(response.status === 200){
             this.modalClose();
             this.toastr.success('Login successfull.','Welcome');
             if(response.data.userDetails.userType === 'admin'){
              this.router.navigate(['/dashboard/admin']);
             }else{
              this.router.navigate(['/dashboard/user']);
             }
            
          }else{
            this.toastr.error(`${response.message}`,'ERROR');
          }
      },
      (err)=>{
          this.toastr.error('Some error occurred.','ERROR');
      });
    }
  }

  public modalClose():any{
    console.log('modal close called.');
    this.appService.popup.next('close');
  }
   

}
