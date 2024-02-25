import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { PreBoardingModule } from './demo/components/pre-boarding/pre-boarding.module';

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    { path: '', redirectTo: '/loginone', pathMatch: 'full' },
    {

        path: '', component: AppLayoutComponent,
        children: [
            // { path: '', loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule) },
            { path: 'uikit', data: { breadcrumb: 'UI Kit' }, loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
            { path: 'utilities', data: { breadcrumb: 'Utilities' }, loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
            //  { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./demo/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) }
        ]
    },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: 'loginone', loadChildren: () => import('./demo/components/loginone/loginone.module').then(m => m.LoginoneModule) },
    { path: 'home', loadChildren: () => import('./demo/components/home/home.module').then(m => m.HomeModule) },
    { path: 'jobs', loadChildren: () => import('./demo/components/jobs/jobs.module').then(m => m.JobsModule) },
    { path: 'candidates', loadChildren: () => import('./demo/components/candidates/candidates.module').then(m => m.CandidatesModule) },
    { path: 'pre-boarding', loadChildren: () => import('./demo/components/pre-boarding/pre-boarding.module').then(m => m.PreBoardingModule) },
    { path: 'reports', loadChildren: () => import('./demo/components/reports/reports.module').then(m => m.ReportsModule) },
    { path: 'settings', loadChildren: () => import('./demo/components/settings/settings.module').then(m => m.SettingsModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
