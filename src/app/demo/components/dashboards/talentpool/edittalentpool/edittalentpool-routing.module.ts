import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdittalentpoolComponent } from './edittalentpool.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EdittalentpoolComponent }
	])],
	exports: [RouterModule]
})
export class EdittalentpoolRoutingModule { }
