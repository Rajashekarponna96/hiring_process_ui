import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateliststageswiseComponent } from './candidateliststageswise.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CandidateliststageswiseComponent }
	])],
	exports: [RouterModule]
})
export class CandidateliststageswiseRoutingModule { }
