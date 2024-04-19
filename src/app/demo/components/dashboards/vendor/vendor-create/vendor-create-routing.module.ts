import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorCreateComponent } from './vendor-create.component';

const routes: Routes = [];


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: VendorCreateComponent }
	])],
	exports: [RouterModule]
})
export class VendorCreateRoutingModule { }
