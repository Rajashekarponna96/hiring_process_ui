import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditcandidateComponent } from './editcandidate.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: EditcandidateComponent}
	])],
  exports: [RouterModule]
})
export class EditcandidateRoutingModule { }
