import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { CreatejobComponent } from './createjob/createjob.component';

const routes: Routes = [];
 
@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: JobsComponent }
	])],
	exports: [RouterModule]
})
export class JobsRoutingModule { }
