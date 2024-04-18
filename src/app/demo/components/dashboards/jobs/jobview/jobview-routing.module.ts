import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobviewComponent } from './jobview.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: JobviewComponent}
	])],
  exports: [RouterModule]
})
export class JobviewRoutingModule { }
