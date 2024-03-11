import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateeducationComponent } from './candidateeducation.component';

const routes: Routes = [];


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CandidateeducationComponent }
	])],
	exports: [RouterModule]
})
export class CandidateeducationRoutingModule { }
