import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateclientComponent } from './createclient.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CreateclientComponent}
	])],
  exports: [RouterModule]
})
export class CreateClientRoutingModule { }