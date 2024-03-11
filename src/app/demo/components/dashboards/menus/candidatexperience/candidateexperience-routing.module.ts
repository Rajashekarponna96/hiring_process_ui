import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatexperienceComponent } from './candidatexperience.component';

const routes: Routes = [];


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CandidatexperienceComponent }
	])],
	exports: [RouterModule]
})
export class CandidateexperienceRoutingModule { }
