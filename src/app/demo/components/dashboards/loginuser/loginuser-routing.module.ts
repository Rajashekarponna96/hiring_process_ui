import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginuserComponent } from './loginuser.component';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LoginuserComponent }
	])],
	exports: [RouterModule]
})
export class LoginuserRoutingModule { }
