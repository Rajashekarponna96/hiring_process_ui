import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisteruserRoutingModule } from './registeruser-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { RegisteruserComponent } from './registeruser.component';


@NgModule({
  declarations: [RegisteruserComponent],
  imports: [
    CommonModule,
    RegisteruserRoutingModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CheckboxModule,
    AppConfigModule,
    PasswordModule

  ]
})
export class RegisteruserModule { }
