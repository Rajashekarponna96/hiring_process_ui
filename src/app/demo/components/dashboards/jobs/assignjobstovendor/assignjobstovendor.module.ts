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


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AssignjobstovendorRoutingModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    EditorModule
  ]
})
export class AssignjobstovendorModule { }
