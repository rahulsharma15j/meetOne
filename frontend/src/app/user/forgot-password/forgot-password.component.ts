import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email:any;
  constructor( private toastr:ToastrService,
    public appService:AppService,) { }

  ngOnInit() {
  }

  public sendResetEmail():any{
    if(!this.email){
      this.toastr.warning('PLEASE ENTER YOUR EMAIL ');
    }else if(this.appService.validateEmail(this.email)){
      this.toastr.warning('ENTERED EMAIL IS INVALID');
    }else{
      let reset = {
        email: this.email
      }
      this.appService.resetPassword(reset).subscribe((response)=>{
         if(response.status === 200){
           this.toastr.success(`${response.message}`);
         }
      },(err)=>{
        this.toastr.error('Some error occurred','ERROR');
      });
    }
  }
}
