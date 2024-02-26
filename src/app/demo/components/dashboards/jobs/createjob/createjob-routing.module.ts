import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatejobComponent } from './createjob.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CreatejobComponent}
	])],
  exports: [RouterModule]
})
export class CreatejobRoutingModule { }
