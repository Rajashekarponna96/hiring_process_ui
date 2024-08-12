import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeuploaderComponent } from './resumeuploader.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: ResumeuploaderComponent}
	])],
  exports: [RouterModule]
})
export class ResumeuploaderRoutingModule { }
