import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateemailComponent } from './createemail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CreateemailComponent}
	])],
  exports: [RouterModule]
})
export class CreateemailRoutingModule { }
