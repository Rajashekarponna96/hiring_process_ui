import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CreatejobRoutingModule } from './createjob-routing.module';
import { FormsModule } from '@angular/forms';
import { CreatejobComponent } from './createjob.component';


@NgModule({
  declarations: [CreatejobComponent],
  imports: [
    CommonModule,
    CreatejobRoutingModule,
    FormsModule,
    ButtonModule,
		RippleModule,
		InputTextModule,
		DropdownModule,
		FileUploadModule,
		InputTextareaModule
  ]
})
export class CreatejobModule { }
