import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreBoardingRoutingModule } from './pre-boarding-routing.module';
import { PreBoardingComponent } from './pre-boarding.component';


@NgModule({
  
  imports: [
    CommonModule,
    PreBoardingRoutingModule
  ],declarations: [PreBoardingComponent]
})
export class PreBoardingModule { }
