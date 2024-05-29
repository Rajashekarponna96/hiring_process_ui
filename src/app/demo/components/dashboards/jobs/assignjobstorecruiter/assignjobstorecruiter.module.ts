import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from "primeng/multiselect";
import { AssignjobstorecruiterRoutingModule } from './assignjobstorecruiter-routing.module';
import { AssignjobstorecruiterComponent } from './assignjobstorecruiter.component';


@NgModule({
  declarations: [AssignjobstorecruiterComponent],
  imports: [
    CommonModule,
    AssignjobstorecruiterRoutingModule,
    FormsModule,
    ButtonModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule,
    EditorModule,
    MultiSelectModule
  ]
})
export class AssignjobstorecruiterModule { }
