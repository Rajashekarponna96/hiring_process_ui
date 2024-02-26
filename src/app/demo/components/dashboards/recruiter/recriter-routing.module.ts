import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: RecruiterComponent }
	])],
  exports: [RouterModule]
})
export class RecriterRoutingModule { }
