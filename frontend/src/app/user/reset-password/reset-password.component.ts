import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public password:any;
  public confirm:any;
  public resetToken:any;
   

  constructor(private toastr:ToastrService,
    public appService:AppService,
    private router:Router,
    public route:ActivatedRoute) { }

  ngOnInit() {
    this.resetToken = this.route.snapshot.paramMap.get('resetToken');
  }

  public resetUserPassword():any{
    if(!this.password){
      this.toastr.warning('PASSWORD RQUIRED');
    }else if(!this.confirm){
      this.toastr.warning('CONFIRM PASSWORD REQUIRED');
    }else if(this.password !== this.confirm){
      this.toastr.warning('PASSWORD DOES NOT MATCHES');
    }else if(!this.appService.validatePassword(this.password) || 
              !this.appService.validatePassword(this.confirm)){
      this.toastr.warning('PASSWORD LENGTH 8 REQUIRED');
    }else{
      let password = {
        password: this.password,
        confirm: this.confirm,
        resetToken: this.resetToken
      }
      
      this.appService.updatePassword(password).subscribe((response)=>{
        console.log(response);
         if(response.status === 200){
             this.toastr.success('PASSWORD UPDATED SUCCESSFULL');
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
