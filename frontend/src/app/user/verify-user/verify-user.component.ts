import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  public isActivated:boolean = false;
  public isProcessing:boolean = false;
  public message:boolean = false;
  public Id:any ;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    public appService:AppService,
    private toastr:ToastrService) { }

  ngOnInit() {
     this.Id = this.route.snapshot.paramMap.get('userId');
     this.appService.verifyUser(this.Id).subscribe((response)=>{
          this.isProcessing = true;
          if(response.status === 200){
            this.isProcessing = false
            this.isActivated = true;
            this.toastr.success('YOUR ACCOUNT IS ACTIVATED');
          }else{
            this.isProcessing = false;
            this.message = true;
            this.toastr.warning(`${response.message}`);
          }
     },(err)=>{
         if(err.status === 404){
            this.toastr.error('USER VERIFICATION FAILED');
         }else{
            this.toastr.error('INTERNAL SERVER ERROR');
            this.router.navigate(['/error']);
         }
     });
  }

}
