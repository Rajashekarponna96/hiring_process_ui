import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginoneRoutingModule } from './loginone-routing.module';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from '../auth/login/login.component';
import { LoginoneComponent } from './loginone.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';


@NgModule({

  imports: [
    CommonModule,
    LoginoneRoutingModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    AppConfigModule
  ], declarations: [LoginoneComponent]
})
export class LoginoneModule { }


