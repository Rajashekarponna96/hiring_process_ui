import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { PreBoardingModule } from './pre-boarding/pre-boarding.module';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: { breadcrumb: 'E-Commerce Dashboard' }, loadChildren: () => import('./ecommerce/ecommerce.dashboard.module').then(m => m.EcommerceDashboardModule) },
        { path: 'dashboard-banking', data: { breadcrumb: 'Banking Dashboard' }, loadChildren: () => import('./banking/banking.dashboard.module').then(m => m.BankingDashboardModule) },
        { path: 'loginuser', data: { breadcrumb: 'loginuser' }, loadChildren: () => import('./loginuser/loginuser.module').then(m => m.LoginuserModule) },
        { path: 'registeruser', data: { breadcrumb: 'registeruser' }, loadChildren: () => import('./registeruser/registeruser.module').then(m => m.RegisteruserModule) },
        { path: 'home', data: { breadcrumb: 'home' }, loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
        { path: 'jobs', data: { breadcrumb: 'jobs' }, loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
        { path: 'pre-boarding', data: { breadcrumb: 'pre-boarding' }, loadChildren: () => import('./pre-boarding/pre-boarding.module').then(m => m.PreBoardingModule) },
        { path: 'reports', data: { breadcrumb: 'reports' }, loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
        { path: 'settings', data: { breadcrumb: 'settings' }, loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }

    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
