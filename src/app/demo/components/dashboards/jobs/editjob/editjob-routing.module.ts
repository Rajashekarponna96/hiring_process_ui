import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditjobComponent } from './editjob.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: EditjobComponent}
	])],
  exports: [RouterModule]
})
export class EditjobRoutingModule { }
