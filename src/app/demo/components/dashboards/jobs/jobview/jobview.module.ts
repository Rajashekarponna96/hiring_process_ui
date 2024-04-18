import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobviewRoutingModule } from './jobview-routing.module';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { JobviewComponent } from './jobview.component';
import { DataViewModule } from 'primeng/dataview';


import { FileUploadModule } from 'primeng/fileupload';
// import { FileDemoRoutingModule } from './filedemo-routing.module';
// import { FileDemoComponent } from './filedemo.component';


@NgModule({
	declarations: [JobviewComponent],
	imports: [
		CommonModule,
		JobviewRoutingModule,
		FormsModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		TableModule,
		ToastModule,
		ButtonModule,
		RadioButtonModule,
		ToggleButtonModule,
		RippleModule,
		ProgressBarModule,
		DialogModule,
		ConfirmDialogModule,
		CheckboxModule,
		FileUploadModule,
		DataViewModule,
		DropdownModule


	]
})
export class JobviewModule { }
