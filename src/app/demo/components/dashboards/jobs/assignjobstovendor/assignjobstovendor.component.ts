import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../../model/job';
import { Pagination } from '../../../model/pagination';
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
  vendors: Vendor[] = []; // List of vendors
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;
  selectedVendorId: number | null = null; // Track selected vendor for assignment
  selectedJobId: number | null = null; // Track selected job for assignment

  constructor(private jobService: JobService, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.getAllJobs();
    this.getAllVendors(); // Fetch vendors on init
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllVendors() {
    this.jobService.getAllVendors().subscribe((data) => {
      this.vendors = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  assignJobsToVendor() {
    if (this.selectedJobId && this.selectedVendorId) {
      this.jobService.assignVendorToJob(this.selectedJobId, this.selectedVendorId).subscribe(() => {
        console.log(`Assigned job ${this.selectedJobId} to vendor ${this.selectedVendorId}`);
        // Reset the form fields
        this.selectedJobId = null;
        this.selectedVendorId = null;
        // Optionally, reload the data after assigning the job to the vendor
        this.getAllJobs();
      });
    } else {
      console.warn('Both job and vendor must be selected for assignment.');
    }
  }



}


