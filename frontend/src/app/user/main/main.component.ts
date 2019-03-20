import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { ViewChild, ElementRef} from '@angular/core';
 

declare var jQuery:any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit,OnDestroy  {
 
  
  @ViewChild('closeModal') closeModal: ElementRef;
   
  public signupSuccess:boolean = false;
  public recoveryMail:boolean = false;
  public isParent:boolean = true;
  
  constructor(public router:Router,public appService: AppService ) {
   this.appService.popup.subscribe((val)=>{
        if(val == 'signUp'){
          this.closeModal.nativeElement.click();
          this.signupSuccess = true;
          this.isParent = false;
        }else if(val == 'recovery'){
          this.closeModal.nativeElement.click();
          this.recoveryMail = true;
          this.isParent = false;
        }else if(val == 'logIn'){
          this.closeModal.nativeElement.click();
          this.recoveryMail = false;
          this.signupSuccess = false;
          this.isParent = true;
        }
    });
   }

  ngOnInit() {
  }

  onClick(){
   this.router.navigate(['/']);
  }

  onClickOnHome(){
    this.signupSuccess = false;
    this.recoveryMail = false;
    this.isParent = true;
  }
  
  onClickOnLink(event){
    event.preventDefault();
  }

}
