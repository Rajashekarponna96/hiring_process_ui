import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { RouterModule } from '@angular/router';
import { JobsComponent } from './jobs.component';


@NgModule({
 
  imports: [
    RouterModule,
    CommonModule,
    JobsRoutingModule
  ], declarations: [JobsComponent]
})
export class JobsModule { }
