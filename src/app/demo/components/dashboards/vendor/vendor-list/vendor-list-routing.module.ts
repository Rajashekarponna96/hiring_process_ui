import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorListComponent } from './vendor-list.component';

const routes: Routes = [];


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VendorListComponent }
	])],
	exports: [RouterModule]
})
export class VendorListRoutingModule { }
