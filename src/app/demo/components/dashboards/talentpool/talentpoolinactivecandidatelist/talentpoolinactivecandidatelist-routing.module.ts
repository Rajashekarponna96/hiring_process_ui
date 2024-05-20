import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalentpoolinactivecandidatelistComponent } from './talentpoolinactivecandidatelist.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TalentpoolinactivecandidatelistComponent }
  ])],
  exports: [RouterModule]
})
export class TalentpoolinactivecandidatelistRoutingModule { }
