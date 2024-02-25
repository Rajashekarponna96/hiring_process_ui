import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { LoginoneComponent } from './loginone.component';

const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
@NgModule({
      imports: [RouterModule.forChild([
          { path: '', component: LoginoneComponent }
      ])],
      exports: [RouterModule]
  })

  export class LoginoneRoutingModule { }

