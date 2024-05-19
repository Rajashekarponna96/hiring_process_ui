import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Candidate } from '../../../model/candidate';
import { HiringFlowActivity } from '../../../model/hiringFlowActivity';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hiringflowactivity',
  templateUrl: './hiringflowactivity.component.html',
  styleUrls: ['./hiringflowactivity.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class HiringflowactivityComponent implements OnInit {

  candidateId!: number;

  hiringFlowActivity: HiringFlowActivity = new HiringFlowActivity();
  hiringFlowActivitys: HiringFlowActivity[] = [];

  currentStep: number = 0; totalSteps = 7;
  tabs: string[] = ['Profile', 'Hiring Flow', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];


  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }
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

  getCandidateId(){
    this.candidateId = JSON.parse(localStorage.getItem('candidateid') || '{}');
    console.log("candidateid in hiringflow activity............."+this.candidateId)
  }

  getHiringFlowList() { 
    return this.http.get<HiringFlowActivity[]>(
        'http://localhost:9000/hiringFlowActivities/candidate/'+this.candidateId);
}
getAllHiringFlowList() { debugger
    return  this.getHiringFlowList().subscribe((data: HiringFlowActivity[]) => {
      console.log('Fetched Data:', data);
      this.hiringFlowActivity = data[0];
      console.log('Assigned Data:', this.hiringFlowActivity);
      this.changeDetectorRefs.markForCheck();
    });
}


  onGlobalFilter1(event:any){

  }

  goToFirstPage(){

  }

  goToPreviousPage(){

  }

  goToNextPage(){

  }

  goToLastPage(){

  }

  onRecordsPerPageChange(event:any){
    
  }

}

