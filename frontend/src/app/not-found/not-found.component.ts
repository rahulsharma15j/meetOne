import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.router.navigate(['/']);
    },1000);
  }
  onClickOnLink(event){
    event.preventDefault();
  }

}
