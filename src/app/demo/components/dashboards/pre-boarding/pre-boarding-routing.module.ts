import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreBoardingComponent } from './pre-boarding.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PreBoardingComponent }
	])],
	exports: [RouterModule]
})
export class PreBoardingRoutingModule { }
