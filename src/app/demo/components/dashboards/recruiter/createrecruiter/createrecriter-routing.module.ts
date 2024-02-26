import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaterecruiterComponent } from './createrecruiter.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CreaterecruiterComponent}
	])],
  exports: [RouterModule]
})
export class CreaterecriterRoutingModule { }
