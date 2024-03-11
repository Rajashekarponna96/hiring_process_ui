import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { EditjobRoutingModule } from './editjob-routing.module';
import { EditjobComponent } from './editjob.component';


@NgModule({
  declarations: [EditjobComponent],
  imports: [
    CommonModule,
    EditjobRoutingModule,
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
export class EditjobModule { }
