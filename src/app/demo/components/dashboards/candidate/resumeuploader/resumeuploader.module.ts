import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeuploaderRoutingModule } from './resumeuploader-routing.module';
import { ResumeuploaderComponent } from './resumeuploader.component';


@NgModule({
  declarations: [ResumeuploaderComponent],
  imports: [
    CommonModule,
    ResumeuploaderRoutingModule
  ]
})
export class ResumeuploaderModule { }
