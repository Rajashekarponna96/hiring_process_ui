import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalentpoolComponent } from './talentpool.component';

const routes: Routes = [];


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: TalentpoolComponent }
	])],
	exports: [RouterModule]
})
export class TalentpoolRoutingModule { }
