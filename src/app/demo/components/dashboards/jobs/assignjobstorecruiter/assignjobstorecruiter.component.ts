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
  selectedRecruiterIds: number[] = [];
  selectedJobIds: number[] = [];
  
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
    this.jobService.assignJobsToRecruiter(this.selectedRecruiterIds, this.selectedJobIds)
    .subscribe(
      () => {
        console.log('Jobs assigned successfully');
        this.router.navigateByUrl('/home');
      },
      error => {
        console.error('Error assigning jobs', error);
        // Add your error handling code here
      }
    );
  }
}
