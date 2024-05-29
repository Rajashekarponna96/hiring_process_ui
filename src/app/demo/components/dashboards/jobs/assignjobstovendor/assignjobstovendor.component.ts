

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../../model/job';
import { Vendor } from '../../../model/vendor';
import { JobService } from '../job.service';

@Component({
  selector: 'app-assignjobstovendor',
  templateUrl: './assignjobstovendor.component.html',
  styleUrls: ['./assignjobstovendor.component.css']
})
export class AssignjobstovendorComponent implements OnInit {
  job: Job = new Job();
  jobs: Job[] = [];
  vendors: Vendor[] = [];
  selectedVendorId: number | null = null;
  selectedJobId: number | null = null;

  constructor(private jobService: JobService, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.getAllJobs();
    this.getAllVendors();
  }

  getAllJobs() {
    this.jobService. getAllJobs().subscribe((data: Job[]) => {
      this.jobs = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllVendors() {
    this.jobService.getAllVendors().subscribe((data: Vendor[]) => {
      this.vendors = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  assignJobsToVendor() {
    if (this.selectedJobId && this.selectedVendorId) {
      this.jobService.assignVendorToJob(this.selectedJobId, this.selectedVendorId).subscribe(
        () => {
          console.log(`Assigned job ${this.selectedJobId} to vendor ${this.selectedVendorId}`);
          // Remove the assigned job from the jobs list
          this.jobs = this.jobs.filter(job => job.id !== this.selectedJobId);
          this.changeDetectorRefs.markForCheck();
          // Reset the form fields
          this.selectedJobId = null;
          this.selectedVendorId = null;
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
