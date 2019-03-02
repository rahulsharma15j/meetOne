import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  public isActivated = false;
  public isProcessing = false;

  constructor(
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params)=>{
      let userId = params.get('userId');
      this.isProcessing
    });
  }

}
