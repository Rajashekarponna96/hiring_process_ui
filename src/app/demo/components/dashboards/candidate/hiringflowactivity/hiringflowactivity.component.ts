import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HiringFlowActivity } from '../../../model/hiringFlowActivity';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Candidate } from '../../../model/candidate';

@Component({
  selector: 'app-hiringflowactivity',
  templateUrl: './hiringflowactivity.component.html',
  styleUrls: ['./hiringflowactivity.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class HiringflowactivityComponent implements OnInit {
  currentStep: number = 0;
  totalSteps = 7;
  tabs: string[] = ['Profile', 'Hiring Flow', 'Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];
  activities: HiringFlowActivity[] = [];
  candidateId!: number;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.candidateId = params['candidateId'];
      if (this.candidateId) {
        this.loadHiringFlowActivities();
      }
    });
  }

  loadHiringFlowActivities() {
    this.http.get<HiringFlowActivity[]>(`http://localhost:9000/hiringFlowActivities/candidate/${this.candidateId}`)
      .subscribe(
        data => {
          this.activities = data.map(activity => ({
            ...activity,
            createdDate: activity.createdDate ? new Date(activity.createdDate) : undefined
          }));
        },
        error => {
          console.error('Error loading hiring flow activities:', error);
        }
      );
  }


  // loadHiringFlowActivities() {
  //   this.http.get<HiringFlowActivity[]>(`http://localhost:9000/hiringFlowActivities/candidate/${this.candidateId}`)
  //     .subscribe(
  //       data => {
  //         this.activities = data.map(activity => ({
  //           ...activity,
  //           createdDate: activity.createdDate ? new Date(activity.createdDate) : undefined
  //         }));
  //       },
  //       error => {
  //         console.error('Error loading hiring flow activities:', error);
  //       }
  //     );
  // }

  // loadHiringFlowActivities() {
  //   this.http.get<HiringFlowActivity[]>(`http://localhost:9000/hiringFlowActivities/candidate/${this.candidateId}`)
  //     .subscribe(
  //       data => {
  //         this.activities = data.map(activity => ({
  //           ...activity,
  //           createdDate: activity.createdDate ? new Date(activity.createdDate) : undefined
  //         }));
  //       },
  //       error => {
  //         console.error('Error loading hiring flow activities:', error);
  //       }
  //     );
  // }

  // loadHiringFlowActivities() {
  //   this.http.get<HiringFlowActivity[]>(`http://localhost:9000/hiringFlowActivities/candidate/${this.candidateId}`)
  //     .subscribe(
  //       data => {
  //         this.activities = data.map(activity => ({
  //           ...activity,
  //           createdDate: new Date(activity.createdDate)
  //         }));
  //       },
  //       error => {
  //         console.error('Error loading hiring flow activities:', error);
  //       }
  //     );
  // }

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
}

