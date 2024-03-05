import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListtalentpoolComponent } from './listtalentpool.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListtalentpoolComponent }
	])],
	exports: [RouterModule]
})
export class ListtalentpoolRoutingModule { }
