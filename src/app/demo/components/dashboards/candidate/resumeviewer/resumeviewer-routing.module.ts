import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeviewerComponent } from './resumeviewer.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ResumeviewerComponent}
  ])],
  exports: [RouterModule]
})
export class ResumeviewerRoutingModule { }
