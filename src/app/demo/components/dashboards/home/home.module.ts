import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ChartModule,
    RatingModule,
    KnobModule,
    InputNumberModule,
    TagModule,
    TooltipModule,
    TooltipModule,
		DataViewModule,
		DropdownModule,
  ]
})
export class HomeModule { }
