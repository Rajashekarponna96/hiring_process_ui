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
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';


//import { FormsModule } from '@angular/forms';
//import { ToastModule } from 'primeng/toast';
//import { DialogModule } from 'primeng/dialog';
//import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
//import { TableModule } from 'primeng/table';
//import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
//import { RippleModule } from 'primeng/ripple';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
//import { InputTextModule } from 'primeng/inputtext';
//import { PreBoardingComponent } from './pre-boarding.component';
@NgModule({
	imports: [
		CommonModule, FormsModule,
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
		InputTextModule,CommonModule,
		FormsModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		TableModule,
		ToastModule,
		ButtonModule,
		RadioButtonModule,
		ToggleButtonModule,
		RippleModule,
		ProgressBarModule,
		DialogModule,
		ConfirmDialogModule,
		CheckboxModule,
		ToastModule,
		DialogModule,
		FormsModule,
		TooltipModule,
		InputTextModule,
		ButtonModule,
		OverlayPanelModule,
		TableModule,
		ConfirmDialogModule,
		SidebarModule,
		RippleModule,
		ConfirmPopupModule,

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
