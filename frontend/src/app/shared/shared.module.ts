import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstCharComponent } from './first-char/first-char.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [FirstCharComponent , NavComponent],
  imports: [
    CommonModule
  ],
  exports:[
    FirstCharComponent,
    NavComponent
  ]
})
export class SharedModule { }
