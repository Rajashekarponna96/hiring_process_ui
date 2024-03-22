import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalentpooleditComponent } from './talentpooledit.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TalentpooleditComponent }
	])],
	exports: [RouterModule]
})
export class TalentpooleditRoutingModule { }
