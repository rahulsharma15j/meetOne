import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public password:any;
  public confirmPassword:any;
   

  constructor(private toastr:ToastrService,
    public appService:AppService,
    private router:Router) { }

  ngOnInit() {
  }

  public resetUserPassword():any{
     
    if(!this.password === this.confirmPassword){
      this.toastr.warning('PASSWORD DOES NOT MATCHES');
    }else if(!this.appService.validatePassword(this.password) || 
              !this.appService.validatePassword(this.confirmPassword)){
      this.toastr.warning('PASSWORD LENGTH 8 REQUIRED');
    }else{
      let newPassword = {
        password: this.password,
        confirm: this.confirmPassword
      }
      
      this.appService.updatePassword(newPassword).subscribe((response)=>{
         if(response.status === 200){
             this.toastr.success('PASSWORD RESET SUCCESSFULL');
          }else{
            this.toastr.warning(`${response.message}`);
          }
      },
      (err)=>{
        if(err.status === 404){
          this.toastr.error('FAILED TO RESET PASSWORD');
        }else{
          this.toastr.error('INTERNAL SERVER ERROR');
          this.router.navigate(['/error']);
        }
      });
    }
  }

}
