import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditrecruiterComponent } from './editrecruiter.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: EditrecruiterComponent}
	])],
  exports: [RouterModule]
})
export class EditrecruiterRoutingModule { }
