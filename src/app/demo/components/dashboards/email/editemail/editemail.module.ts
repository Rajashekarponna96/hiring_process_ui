import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditemailRoutingModule } from './editemail-routing.module';
import { EditemailComponent } from './editemail.component';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditemailComponent],
  imports: [
    CommonModule,
    EditemailRoutingModule,
    EditorModule,
    MenuModule,
    ButtonModule,
    FileUploadModule,
    ToastModule,
    DialogModule,
    AvatarModule,
    RippleModule,
    TableModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    InputTextareaModule,
    FormsModule
  ]
})
export class EditemailModule { }
