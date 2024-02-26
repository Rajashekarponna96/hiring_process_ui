import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SettingsComponent }
	])],
	exports: [RouterModule]
})
export class SettingsRoutingModule { }
