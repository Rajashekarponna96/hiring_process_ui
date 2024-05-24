import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignjobstovendorRoutingModule } from './assignjobstovendor-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { CreatejobRoutingModule } from '../createjob/createjob-routing.module';
import { AssignjobstovendorComponent } from './assignjobstovendor.component';


@NgModule({
  declarations: [AssignjobstovendorComponent],
  imports: [
    CommonModule,
    AssignjobstovendorRoutingModule,
    CommonModule,
    CreatejobRoutingModule,
    FormsModule,
    ButtonModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
    EditorModule
  ]
})
export class AssignjobstovendorModule { }
