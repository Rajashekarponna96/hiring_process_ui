import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'E-Commerce Dashboard'}, loadChildren: () => import('./ecommerce/ecommerce.dashboard.module').then(m => m.EcommerceDashboardModule) },
        { path: 'dashboard-banking', data: {breadcrumb: 'Banking Dashboard'}, loadChildren: () => import('./banking/banking.dashboard.module').then(m => m.BankingDashboardModule) },
        { path: 'home', data: {breadcrumb: 'testingone'}, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
 
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
