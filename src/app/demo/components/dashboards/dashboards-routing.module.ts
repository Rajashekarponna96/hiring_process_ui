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
        { path: 'createjob', data: {breadcrumb: 'Create'}, loadChildren: () => import('./jobs/createjob/createjob.module').then(m => m.CreatejobModule) },
        { path: 'recruiter', data: { breadcrumb: 'recruiter' }, loadChildren: () => import('./recruiter/recriter.module').then(m => m.RecriterModule )},
        { path: 'createrecruiter', data: {breadcrumb: 'Create'}, loadChildren: () => import('./recruiter/createrecruiter/createrecriter.module').then(m => m.CreaterecriterModule) },
        { path: 'editrecruiter', data: {breadcrumb: 'Edit'}, loadChildren: () => import('./recruiter/editrecruiter/editrecruiter.module').then(m => m.EditrecruiterModule) },
        { path: 'pre-boarding', data: { breadcrumb: 'pre-boarding' }, loadChildren: () => import('./pre-boarding/pre-boarding.module').then(m => m.PreBoardingModule) },
        { path: 'reports', data: { breadcrumb: 'reports' }, loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
        { path: 'settings', data: { breadcrumb: 'settings' }, loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
        { path: 'candidate', data: {breadcrumb: 'testingone'}, loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule) },
        { path: 'createrecandidate', data: {breadcrumb: 'testingone'}, loadChildren: () => import('./candidate/createcandidate/createcandiadte.module').then(m => m.CreatecandiadteModule) },
        { path: 'talentpool', data: {breadcrumb: 'talentpool'}, loadChildren: () => import('./talentpool/talentpool.module').then(m => m.TalentpoolModule) },
        { path: 'listtalentpool', data: {breadcrumb: 'listtalentpool'}, loadChildren: () => import('./talentpool/listtalentpool/listtalentpool.module').then(m => m.ListtalentpoolModule) }


    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
