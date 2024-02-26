import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteruserComponent } from './registeruser.component';

const routes: Routes = [];
@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RegisteruserComponent }
	])],
	exports: [RouterModule]
})
export class RegisteruserRoutingModule { }
