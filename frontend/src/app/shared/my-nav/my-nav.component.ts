import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  onClick(){
   this.router.navigate(['/']);
  }

}
