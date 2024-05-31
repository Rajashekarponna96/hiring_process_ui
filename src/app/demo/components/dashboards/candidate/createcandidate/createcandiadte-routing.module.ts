import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreaterecruiterComponent } from '../../recruiter/createrecruiter/createrecruiter.component';
import {  CreateCandidateComponent } from './createcandidate.component';
 const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CreateCandidateComponent}
	])],
  exports: [RouterModule]
})
export class CreatecandiadteRoutingModule { }
