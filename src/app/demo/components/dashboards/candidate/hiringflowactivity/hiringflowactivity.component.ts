import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HiringFlowActivity } from '../../../model/hiringFlowActivity';
import { HiringFlowActivityService } from 'src/app/demo/hiring-process-services/hiringflowactivity.service';

@Component({
  selector: 'app-hiringflowactivity',
  templateUrl: './hiringflowactivity.component.html',
  styleUrls: ['./hiringflowactivity.component.css'],
  providers: [HiringFlowActivityService]
})
export class HiringflowactivityComponent implements OnInit {

  candidateId!: number;
  hiringFlowActivity: HiringFlowActivity = new HiringFlowActivity();
  hiringFlowActivitys: HiringFlowActivity[] = [];

  currentStep: number = 0;
  totalSteps = 7;
  tabs: string[] = ['Profile', 'Hiring Flow', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private hiringFlowActivityService: HiringFlowActivityService
  ) { }

  ngOnInit(): void {
    this.getCandidateId();
    this.getAllHiringFlowList();
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    this.currentStep = step;
  }

  getCandidateId() {
    this.candidateId = JSON.parse(localStorage.getItem('candidateid') || '{}');
    console.log("candidateid in hiringflow activity............." + this.candidateId);
  }

  getAllHiringFlowList() {
    this.hiringFlowActivityService.getHiringFlowList(this.candidateId).subscribe((data: HiringFlowActivity[]) => {
      console.log('Fetched Data:', data);
      this.hiringFlowActivity = data[0];
      this.hiringFlowActivitys = data;
      console.log('Assigned Data:', this.hiringFlowActivity);
      this.changeDetectorRefs.markForCheck();
    });
  }

  onGlobalFilter1(event: any) { }

  goToFirstPage() { }

  goToPreviousPage() { }

  goToNextPage() { }

  goToLastPage() { }

  onRecordsPerPageChange(event: any) { }
}
