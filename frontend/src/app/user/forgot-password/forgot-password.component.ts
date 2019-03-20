import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email:any;
  public isProcessing: boolean = false;
  constructor( private toastr:ToastrService,
    public appService:AppService,
    public router:Router) { }

  ngOnInit() {
  }

  public sendRecoveryEmail():any{
    if(!this.email){
      this.toastr.warning('PLEASE ENTER YOUR EMAIL ');
    }else if(!this.appService.validateEmail(this.email)){
      this.toastr.warning('PLEASE ENTER VALID EMAIL');
    }else{
      this.isProcessing = true;
      let reset = {
        email: this.email
      }
      this.appService.resetPassword(reset).subscribe((response)=>{
         if(response.status === 200){
          this.modalClose();
          this.toastr.success('PASSWORD RECOVERY EMAIL SENT');
        }else{
          this.toastr.error(`${response.message}`);
          this.isProcessing = false;
        }
      },(err)=>{
        this.toastr.error('INTERNAL SERVER ERROR');
        this.router.navigate(['/error']);
        
      });
    }
  }



  public modalClose():any{
     this.appService.popup.next('recovery');
  }
}
