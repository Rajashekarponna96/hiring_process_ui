import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditemailComponent } from './editemail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: EditemailComponent}
	])],
  exports: [RouterModule]
})
export class EditemailRoutingModule { }
