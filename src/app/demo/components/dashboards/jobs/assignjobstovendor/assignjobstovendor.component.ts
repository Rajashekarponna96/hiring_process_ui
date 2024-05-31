

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../../model/job';
import { Vendor } from '../../../model/vendor';
import { JobService } from '../job.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignjobstovendor',
  templateUrl: './assignjobstovendor.component.html',
  styleUrls: ['./assignjobstovendor.component.css']
})
export class AssignjobstovendorComponent implements OnInit {
  job: Job = new Job();
  jobs: any[] = [];
  vendors: any[] = [];
  selectedVendorIds: number[] = [];
  selectedJobIds: number[] = [];

  constructor(private jobService: JobService, private changeDetectorRefs: ChangeDetectorRef, private router: Router,private http:HttpClient) { }

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
     this.jobService.assignJobsToVendor(this.selectedVendorIds, this.selectedJobIds)
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
    };
  
   

}
