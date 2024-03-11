import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateprofileComponent } from './candidateprofile.component';

const routes: Routes = [];


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CandidateprofileComponent }
	])],
	exports: [RouterModule]
})
export class CandidateprofileRoutingModule { }
