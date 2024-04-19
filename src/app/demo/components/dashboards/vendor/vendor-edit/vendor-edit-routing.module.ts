import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorEditComponent } from './vendor-edit.component';

const routes: Routes = [];


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VendorEditComponent }
	])],
	exports: [RouterModule]
})
export class VendorEditRoutingModule { }
