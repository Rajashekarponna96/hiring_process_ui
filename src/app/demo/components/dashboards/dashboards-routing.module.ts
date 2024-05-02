import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
            // {
            //     path: 'loginuser',
            //     data: { breadcrumb: 'Login User' },
            //     loadChildren: () =>
            //         import('./loginuser/loginuser.module').then(
            //             (m) => m.LoginuserModule
            //         ),
            // },
            {
                path: 'registeruser',
                data: { breadcrumb: 'Register User' },
                loadChildren: () =>
                    import('./registeruser/registeruser.module').then(
                        (m) => m.RegisteruserModule
                    ),
            },
            {
                path: 'home',
                data: { breadcrumb: 'Home' },
                loadChildren: () =>
                    import('./home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'jobs',
                data: { breadcrumb: 'Jobs' },
                loadChildren: () =>
                    import('./jobs/jobs.module').then((m) => m.JobsModule),
            },
            {
                path: 'createjob',
                data: { breadcrumb: 'Create Job' },
                loadChildren: () =>
                    import('./jobs/createjob/createjob.module').then(
                        (m) => m.CreatejobModule
                    ),
            },
            {
                path: 'editjob',
                data: { breadcrumb: 'Edit Job' },
                loadChildren: () =>
                    import('./jobs/editjob/editjob.module').then(
                        (m) => m.EditjobModule
                    ),
            },
            {
                path: 'jobview',
                data: { breadcrumb: 'Job View' },
                loadChildren: () =>
                    import('./jobs/jobview/jobview.module').then(
                        (m) => m.JobviewModule
                    ),
            },
            {
                path: 'recruiter',
                data: { breadcrumb: 'Recruiter' },
                loadChildren: () =>
                    import('./recruiter/recriter.module').then(
                        (m) => m.RecriterModule
                    ),
            },
            {
                path: 'createrecruiter',
                data: { breadcrumb: 'Create Recruiter' },
                loadChildren: () =>
                    import(
                        './recruiter/createrecruiter/createrecriter.module'
                    ).then((m) => m.CreaterecriterModule),
            },
            {
                path: 'editrecruiter',
                data: { breadcrumb: 'Edit Recruiter' },
                loadChildren: () =>
                    import(
                        './recruiter/editrecruiter/editrecruiter.module'
                    ).then((m) => m.EditrecruiterModule),
            },
            {
                path: 'pre-boarding',
                data: { breadcrumb: 'Pre-Boarding' },
                loadChildren: () =>
                    import('./pre-boarding/pre-boarding.module').then(
                        (m) => m.PreBoardingModule
                    ),
            },
            {
                path: 'reports',
                data: { breadcrumb: 'Reports' },
                loadChildren: () =>
                    import('./reports/reports.module').then(
                        (m) => m.ReportsModule
                    ),
            },
            {
                path: 'settings',
                data: { breadcrumb: 'Settings' },
                loadChildren: () =>
                    import('./settings/settings.module').then(
                        (m) => m.SettingsModule
                    ),
            },
            {
                path: 'candidate',
                data: { breadcrumb: 'Candidate' },
                loadChildren: () =>
                    import('./candidate/candidate.module').then(
                        (m) => m.CandidateModule
                    ),
            },
            {
                path: 'editcandidate',
                data: { breadcrumb: 'Edit Candidate' },
                loadChildren: () =>
                    import('./candidate/editcandidate/editcandidate.module').then(
                        (m) => m.EditcandidateModule
                    ),
            },
            {
                path: 'createrecandidate',
                data: { breadcrumb: 'Create Candidate' },
                loadChildren: () =>
                    import(
                        './candidate/createcandidate/createcandiadte.module'
                    ).then((m) => m.CreatecandiadteModule),
            },
            {
                path: 'talentpool',
                data: { breadcrumb: 'Create TalentPool' },
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
                data: { breadcrumb: 'Edit TalentPool' },
                loadChildren: () =>
                    import(
                        './talentpool/edittalentpool/edittalentpool.module'
                    ).then((m) => m.EdittalentpoolModule),
            },

            {
                path: 'edittalentpool',
                data: { breadcrumb: 'Edit Talentpool' },
                loadChildren: () =>
                    import(
                        './talentpool/edittalentpool/edittalentpool.module'
                    ).then((m) => m.EdittalentpoolModule),
            },

            {
                path: 'talentpooledit',
                data: { breadcrumb: 'Edit Talentpool' },
                loadChildren: () =>
                    import(
                        './talentpool/talentpooledit/talentpooledit.module'
                    ).then((m) => m.TalentpooleditModule),
            },


            {
                path: 'menus',
                data: { breadcrumb: 'Create Candidate' },
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
                data: { breadcrumb: 'Create Client' },
                loadChildren: () =>
                    import('./client/createclient/createclient.module').then((m) => m.CreateclientModule),
            },
            {
                path: 'editclient',
                data: { breadcrumb: 'Edit Client' },
                loadChildren: () =>
                    import('./client/editclient/editclient.module').then((m) => m.EditclientModule),
            },
            {
                path: 'menus',
                data: { breadcrumb: 'menus' },
                loadChildren: () =>
                    import('./menus/menus.module').then((m) => m.MenusModule),
            },
            {
                path: 'vendor-create',
                data: { breadcrumb: 'Create Vendor' },
                loadChildren: () =>
                    import('./vendor/vendor-create/vendor-create.module').then((m) => m.VendorCreateModule),
            },
            {
                path: 'vendor-list',
                data: { breadcrumb: 'Vendor' },
                loadChildren: () =>
                    import('./vendor/vendor-list/vendor-list.module').then((m) => m.VendorListModule),
            },
            {
                path: 'vendor-edit',
                data: { breadcrumb: 'Edit Vendor' },
                loadChildren: () =>
                    import('./vendor/vendor-edit/vendor-edit.module').then((m) => m.VendorEditModule),
            },
            {
                path: 'email',
                data: { breadcrumb: 'Email' },
                loadChildren: () =>
                    import('./email/email.module').then((m) => m.EmailModule),
            },
            {
                path: 'createemail',
                data: { breadcrumb: 'Create Email' },
                loadChildren: () =>
                    import('./email/createemail/createemail.module').then((m) => m.CreateemailModule),
            },
            {
                path: 'editemail',
                data: { breadcrumb: 'Edit Email' },
                loadChildren: () =>
                    import('./email/editemail/editemail.module').then((m) => m.EditemailModule),
            },

        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule { }
