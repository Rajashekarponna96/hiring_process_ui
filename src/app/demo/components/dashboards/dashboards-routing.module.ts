import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { PreBoardingModule } from './pre-boarding/pre-boarding.module';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                data: { breadcrumb: 'E-Commerce Dashboard' },
                loadChildren: () =>
                    import('./ecommerce/ecommerce.dashboard.module').then(
                        (m) => m.EcommerceDashboardModule
                    ),
            },
            {
                path: 'dashboard-banking',
                data: { breadcrumb: 'Banking Dashboard' },
                loadChildren: () =>
                    import('./banking/banking.dashboard.module').then(
                        (m) => m.BankingDashboardModule
                    ),
            },
            {
                path: 'loginuser',
                data: { breadcrumb: 'loginuser' },
                loadChildren: () =>
                    import('./loginuser/loginuser.module').then(
                        (m) => m.LoginuserModule
                    ),
            },
            {
                path: 'registeruser',
                data: { breadcrumb: 'registeruser' },
                loadChildren: () =>
                    import('./registeruser/registeruser.module').then(
                        (m) => m.RegisteruserModule
                    ),
            },
            {
                path: 'home',
                data: { breadcrumb: 'home' },
                loadChildren: () =>
                    import('./home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'jobs',
                data: { breadcrumb: 'jobs' },
                loadChildren: () =>
                    import('./jobs/jobs.module').then((m) => m.JobsModule),
            },
            {
                path: 'createjob',
                data: { breadcrumb: 'CreateJob' },
                loadChildren: () =>
                    import('./jobs/createjob/createjob.module').then(
                        (m) => m.CreatejobModule
                    ),
            },
            {
                path: 'editjob',
                data: { breadcrumb: 'EditJob' },
                loadChildren: () =>
                    import('./jobs/editjob/editjob.module').then(
                        (m) => m.EditjobModule
                    ),
            },
            {
                path: 'recruiter',
                data: { breadcrumb: 'recruiter' },
                loadChildren: () =>
                    import('./recruiter/recriter.module').then(
                        (m) => m.RecriterModule
                    ),
            },
            {
                path: 'createrecruiter',
                data: { breadcrumb: 'CreateRecruiter' },
                loadChildren: () =>
                    import(
                        './recruiter/createrecruiter/createrecriter.module'
                    ).then((m) => m.CreaterecriterModule),
            },
            {
                path: 'editrecruiter',
                data: { breadcrumb: 'EditRecruiter' },
                loadChildren: () =>
                    import(
                        './recruiter/editrecruiter/editrecruiter.module'
                    ).then((m) => m.EditrecruiterModule),
            },
            {
                path: 'pre-boarding',
                data: { breadcrumb: 'pre-boarding' },
                loadChildren: () =>
                    import('./pre-boarding/pre-boarding.module').then(
                        (m) => m.PreBoardingModule
                    ),
            },
            {
                path: 'reports',
                data: { breadcrumb: 'reports' },
                loadChildren: () =>
                    import('./reports/reports.module').then(
                        (m) => m.ReportsModule
                    ),
            },
            {
                path: 'settings',
                data: { breadcrumb: 'settings' },
                loadChildren: () =>
                    import('./settings/settings.module').then(
                        (m) => m.SettingsModule
                    ),
            },
            {
                path: 'candidate',
                data: { breadcrumb: 'candidate' },
                loadChildren: () =>
                    import('./candidate/candidate.module').then(
                        (m) => m.CandidateModule
                    ),
            },
            {
                path: 'editcandidate',
                data: { breadcrumb: 'candidate' },
                loadChildren: () =>
                    import('./candidate/editcandidate/editcandidate.module').then(
                        (m) => m.EditcandidateModule
                    ),
            },
            {
                path: 'createrecandidate',
                data: { breadcrumb: 'CreateCandidate' },
                loadChildren: () =>
                    import(
                        './candidate/createcandidate/createcandiadte.module'
                    ).then((m) => m.CreatecandiadteModule),
            },
            {
                path: 'talentpool',
                data: { breadcrumb: 'CreateTalentPool' },
                loadChildren: () =>
                    import('./talentpool/talentpool.module').then(
                        (m) => m.TalentpoolModule
                    ),
            },
            {
                path: 'listtalentpool',
                data: { breadcrumb: 'TalentPool' },
                loadChildren: () =>
                    import(
                        './talentpool/listtalentpool/listtalentpool.module'
                    ).then((m) => m.ListtalentpoolModule),
            },
            {
                path: 'edittalentpool',
                data: { breadcrumb: 'EditTalentPool' },
                loadChildren: () =>
                    import(
                        './talentpool/edittalentpool/edittalentpool.module'
                    ).then((m) => m.EdittalentpoolModule),
            },

            {
                path: 'edittalentpool',
                data: { breadcrumb: 'edittalentpool' },
                loadChildren: () =>
                    import(
                        './talentpool/edittalentpool/edittalentpool.module'
                    ).then((m) => m.EdittalentpoolModule),
            },

            {
                path: 'talentpooledit',
                data: { breadcrumb: 'talentpooledit' },
                loadChildren: () =>
                    import(
                        './talentpool/talentpooledit/talentpooledit.module'
                    ).then((m) => m.TalentpooleditModule),
            },


            {
                path: 'menus',
                data: { breadcrumb: 'CreateCandidate' },
                loadChildren: () =>
                    import('./menus/menus.module').then((m) => m.MenusModule),
            },

            {
                path: 'client',
                data: { breadcrumb: 'Client' },
                loadChildren: () =>
                    import('./client/client.module').then((m) => m.ClientModule),
            },
            {
                path: 'createclient',
                data: { breadcrumb: 'CreateClient' },
                loadChildren: () =>
                    import('./client/createclient/createclient.module').then((m) => m.CreateclientModule),
            },
            {
                path: 'editclient',
                data: { breadcrumb: 'EditClient' },
                loadChildren: () =>
                    import('./client/editclient/editclient.module').then((m) => m.EditclientModule),
            },
            {
                path: 'menus',
                data: { breadcrumb: 'menus' },
                loadChildren: () =>
                    import('./menus/menus.module').then((m) => m.MenusModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule { }
