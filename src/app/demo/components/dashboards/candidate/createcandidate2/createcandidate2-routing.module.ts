import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Createcandidate2Component } from './createcandidate2.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: Createcandidate2Component }
	])],
	exports: [RouterModule]
})
export class Createcandidate2RoutingModule { }
