import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditrecruiterRoutingModule } from './editrecruiter-routing.module';
import { EditrecruiterComponent } from './editrecruiter.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";


@NgModule({
  declarations: [EditrecruiterComponent],
  imports: [
    CommonModule,
    EditrecruiterRoutingModule,
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
		InputTextModule

  ]
})
export class EditrecruiterModule { }
