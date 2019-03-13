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
  
  constructor(public router:Router,public appService: AppService ) {
   this.appService.popup.subscribe((val)=>{
        if(val == 'close'){
          this.closeModal.nativeElement.click();
          this.signupSuccess = true;
          
        }
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    
  }
   
  

  onClick(){
   this.router.navigate(['/']);
  }

  onClickOnHome(){
    this.signupSuccess = false;
  }
  
  onClickOnLink(event){
    event.preventDefault();
  }

}
