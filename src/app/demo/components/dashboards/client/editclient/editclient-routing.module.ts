import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditclientComponent } from './editclient.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		 { path: '', component: EditclientComponent}
	])],
  exports: [RouterModule]
})
export class EditclientRoutingModule { }
