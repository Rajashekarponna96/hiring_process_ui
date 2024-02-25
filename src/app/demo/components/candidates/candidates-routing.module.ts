import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates.component';

const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })

@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: CandidatesComponent }
  ])],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
