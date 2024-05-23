import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignjobstovendorComponent } from './assignjobstovendor.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AssignjobstovendorComponent }
  ])],
  exports: [RouterModule]
})
export class AssignjobstovendorRoutingModule { }
