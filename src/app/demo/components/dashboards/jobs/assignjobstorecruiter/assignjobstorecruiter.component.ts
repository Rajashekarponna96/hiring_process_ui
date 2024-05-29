import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Job } from '../../../model/job';
import { Recruiter } from '../../../model/recruiter';
import { Router } from '@angular/router';
import { JobService } from '../job.service';

@Component({
  selector: 'app-assignjobstorecruiter',
  templateUrl: './assignjobstorecruiter.component.html',
  styleUrls: ['./assignjobstorecruiter.component.scss']
})
export class AssignjobstorecruiterComponent implements OnInit{

  job: Job = new Job();
  jobs: Job[] = [];
  recruiters: Recruiter[] = [];
  selectedRecruiterId: number | null = null;
  selectedJobId: number | null = null;

  
 constructor(private jobService: JobService, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }
 
 ngOnInit() {
    this.getAllRecruiters();
    this.getAllJobs();
    
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe((data: Job[]) => {
      this.jobs = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllRecruiters() {
    this.jobService.getAllRecruiters().subscribe((data: Recruiter[]) => {
      this.recruiters = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  assignJobsToRecruiter() {
    if (this.selectedJobId && this.selectedRecruiterId) {
      this.jobService.assignVendorToJob(this.selectedJobId, this.selectedRecruiterId).subscribe(
        () => {
          console.log(`Assigned job ${this.selectedJobId} to vendor ${this.selectedRecruiterId}`);
          // Remove the assigned job from the jobs list
          this.jobs = this.jobs.filter(job => job.id !== this.selectedJobId);
          this.changeDetectorRefs.markForCheck();
          // Reset the form fields
          this.selectedJobId = null;
          this.selectedRecruiterId = null;
        },
        (error) => {
          if (error.status === 409) {
            alert('Vendor is already assigned to this job.');
          } else {
            console.error('An error occurred:', error);
          }
        }
      );
    } else {
      console.warn('Both job and vendor must be selected for assignment.');
    }
  }
}
