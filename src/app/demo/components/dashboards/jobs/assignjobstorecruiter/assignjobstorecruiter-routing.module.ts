import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignjobstorecruiterComponent } from './assignjobstorecruiter.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: AssignjobstorecruiterComponent}
  ])],
  exports: [RouterModule]
})
export class AssignjobstorecruiterRoutingModule { }
