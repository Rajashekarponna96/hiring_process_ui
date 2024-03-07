import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Createcandidate2RoutingModule } from './createcandidate2-routing.module';
import { CreatecandidateComponent } from '../createcandidate/createcandidate.component';
import { Createcandidate2Component } from './createcandidate2.component';


@NgModule({
  declarations: [Createcandidate2Component],
  imports: [
    CommonModule,
    Createcandidate2RoutingModule
  ]
})
export class Createcandidate2Module { }
