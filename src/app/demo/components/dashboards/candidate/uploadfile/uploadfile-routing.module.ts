import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadfileComponent } from './uploadfile.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UploadfileComponent}
  ])],
  exports: [RouterModule]
})
export class UploadfileRoutingModule { }
