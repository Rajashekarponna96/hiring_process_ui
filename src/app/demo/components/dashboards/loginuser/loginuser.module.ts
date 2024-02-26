import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginuserRoutingModule } from './loginuser-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { LoginuserComponent } from './loginuser.component';


@NgModule({
  declarations: [LoginuserComponent],
  imports: [
    CommonModule,
    LoginuserRoutingModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    AppConfigModule
  ]
})
export class LoginuserModule { }
