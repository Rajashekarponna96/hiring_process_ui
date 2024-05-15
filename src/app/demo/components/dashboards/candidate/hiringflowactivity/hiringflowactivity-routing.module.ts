import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringflowactivityComponent } from './hiringflowactivity.component';

const routes: Routes = [];


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: HiringflowactivityComponent }
  ])],
  exports: [RouterModule]
})
export class HiringflowactivityRoutingModule { }
