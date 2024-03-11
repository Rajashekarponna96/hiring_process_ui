import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenusComponent } from './menus.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { CreatecandidateComponent } from '../candidate/createcandidate/createcandidate.component';
import { CandidateprofileComponent } from './candidateprofile/candidateprofile.component';
import { CandidatexperienceComponent } from './candidatexperience/candidatexperience.component';
import { CandidateeducationComponent } from './candidateeducation/candidateeducation.component';
@NgModule({
	imports: [
		CommonModule,
		BreadcrumbModule,
		MenubarModule,
		TabMenuModule,
		StepsModule,
		TieredMenuModule,
		MenuModule,
		ButtonModule,
		ContextMenuModule,
		MegaMenuModule,
		PanelMenuModule,
		InputTextModule,
		RouterModule.forChild([
			{
				path: '',
				component: MenusComponent,
				children: [
					{ path: '', redirectTo: 'candidate', pathMatch: 'full' },
					{
						path: 'createrecandidate',
						component: CreatecandidateComponent,
					},
					{
						path: 'candidateprofile',
						component: CandidateprofileComponent,
					},
					{
						path: 'candidateexperiencne',
						component: CandidatexperienceComponent,
					},
					{
						path: 'candidateeducation',
						component: CandidateeducationComponent,
					},
				],
			},
		]),
	],
	declarations: [MenusComponent],
	exports: [RouterModule],
})
export class MenusModule { }
