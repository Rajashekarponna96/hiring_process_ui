import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate.component';
import { MenusComponent } from '../menus/menus.component';

const routes: Routes = [
  // { path: 'menus/:id', component: MenusComponent }
];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CandidateComponent }
	])],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
