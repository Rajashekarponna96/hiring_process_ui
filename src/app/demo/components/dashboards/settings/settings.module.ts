import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    DataViewModule,
    PickListModule,
    OrderListModule,
    InputTextModule,
    DropdownModule,
    RatingModule,
    ButtonModule
  ]
})
export class SettingsModule { }
