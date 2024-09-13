import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { Job } from '../../../model/job';
import { Department } from '../../../model/Department';
import { Currency } from '../../../model/currency';
import { Recruiter } from '../../../model/recruiter';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Client } from '../../../model/client';
import { JobService } from '../job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '../../../model/location';

@Component({
  selector: 'app-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['./editjob.component.scss']
})
export class EditjobComponent implements OnInit {
  @ViewChild('jobForm') jobForm!: NgForm;

  // Initialize job-related data
  job: Job = new Job();
  jobs: Job[] = [];
  client = new Client();
  selectedClients: any;
  clients: Client[] = [];
  department = new Department();
  selectedDepartments: any;
  departments: Department[] = [];
  currency = new Currency();
  selectedCurrencys: any;
  currencys: Currency[] = [];
  recruiter = new Recruiter();
  selectedRecruiters: any;
  recruiters: Recruiter[] = [];
  locations: Location[] = [];

  // Job types
  selectedJobType: any;
  types: any[] = [
    { "name": 'FullTime' },
    { "name": 'PartTime' },
    { "name": 'CONTRACT' },
    { "name": 'FreeLance' }
  ];

  constructor(
    private jobService: JobService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    const stateData = history.state || {};
    const job = stateData.job;

    if (job) {
      this.job = job;
      this.selectedDepartments = this.job.department;
      this.selectedCurrencys = this.job.currney;
      this.selectedRecruiters = this.job.recruiters;
      this.selectedJobType = this.job.type;
      this.selectedClients = this.job.clients;
    } else {
      console.error('Job data is missing in state.');
    }

    // Fetch dropdown data
    this.getAllJobList();
    this.getAllDepartmentList();
    this.getAllCurrencyList();
    this.getAllRecruiterList();
    this.getAllClientList();
    this.getAllLocationList();
  }

  // Fetch all jobs (used for updating UI after an edit)
  getAllJobList() {
    this.jobService.getAllJobs().subscribe((data: Job[]) => {
      this.jobs = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  // Fetch department data
  getAllDepartmentList() {
    this.jobService.getAllDepartments().subscribe((data: Department[]) => {
      this.departments = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  // Fetch currency data
  getAllCurrencyList() {
    this.jobService.getAllCurrencies().subscribe((data: Currency[]) => {
      this.currencys = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  // Fetch recruiter data
  getAllRecruiterList() {
    this.jobService.getAllRecruiters().subscribe((data: Recruiter[]) => {
      this.recruiters = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  // Fetch client data
  getAllClientList() {
    this.jobService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  // Fetch location data
  getAllLocationList() {
    this.jobService.getAllLocations().subscribe((data: Location[]) => {
      this.locations = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  // Update job details
  updateJob() {
    this.job.department = this.selectedDepartments;
    this.job.recruiters = this.selectedRecruiters;
    this.job.currney = this.selectedCurrencys;
    this.job.type = this.selectedJobType;
    this.job.clients = this.selectedClients;

    this.jobService.updateJob(this.job).subscribe(
      res => {
        this.getAllJobList();
        this.jobForm.reset(); // Reset the form after a successful update
        this.router.navigateByUrl('/jobs'); // Navigate back to the job list
      },
      (err: HttpErrorResponse) => {
        console.error('Error updating job:', err);
        if (err.error instanceof Error) {
          console.log('Client-side error occurred.');
        } else {
          console.log('Server-side error occurred.');
        }
      }
    );
  }

  // Handle department change
  onDepartmentChange(event: any) {
    this.selectedDepartments = event.target.value;
  }

  // Handle recruiter change
  onRecruiterChange(event: any) {
    this.selectedRecruiters = event.target.value;
  }

  // Handle currency change
  onCurrencyChange(event: any) {
    this.selectedCurrencys = event.target.value;
  }

  // Handle client change
  onClientChange(event: any) {
    this.selectedClients = event.target.value;
  }

  // Return today's date (used in forms)
  todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}


// import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
// import { Job } from '../../../model/job';
// import { Department } from '../../../model/Department';
// import { Currency } from '../../../model/currency';
// import { Recruiter } from '../../../model/recruiter';
// import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
// import { Client } from '../../../model/client';
// import { JobService } from '../job.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Location} from '../../../model/location';
// import { locations1 } from '../../../model/locations1';

// @Component({
//   selector: 'app-editjob',
//   templateUrl: './editjob.component.html',
//   styleUrls: ['./editjob.component.scss']
// })
// export class EditjobComponent implements OnInit {
//   @ViewChild("jobForm") jobForm!: NgForm;

//   job: Job = new Job();
//   jobs: Job[] = [];
//   client = new Client();
//   selectedClients: any;
//   clients: Client[] = [];
//   department = new Department();
//   selectedDepartments: any;
//   departments: Department[] = [];
//   currency = new Currency();
//   selectedCurrencys: any;
//   currencys: Currency[] = [];
//   recruiter = new Recruiter();
//   selectedRecruiters: any;
//   recruiters: Recruiter[] = [];
//   locations1: locations1[] = [];


//   selectedJobType: any;

//   types: any[] = [
//     { "name": 'FullTime' },
//     { "name": 'PartTime' },
//     { "name": 'CONTRACT' },
//     { "name": 'FreeLance' }
//   ];

//   constructor(
//     private jobService: JobService,
//     private changeDetectorRefs: ChangeDetectorRef,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     const stateData = history.state || {};
//     const job = stateData.job;

//     if (job) {
//       this.job = job;
//       this.selectedDepartments = this.job.department;
//       this.selectedCurrencys = this.job.currney;
//       this.selectedRecruiters = this.job.recruiters;
//       this.selectedJobType = this.job.type;
//       this.selectedClients = this.job.clients;
//     } else {
//       console.error('Job data is missing in state.');
//     }

//     this.getAllJobList();
//     this.getAllDepartmentList();
//     this.getAllCurrencyList();
//     this.getAllRecruiterList();
//     this.getAllClientList();
//     this.getAllLocationList();
//   }

//   getAllJobList() {
//     this.jobService.getAllJobs().subscribe((data: Job[]) => {
//       this.jobs = data;
//       this.changeDetectorRefs.markForCheck();
//     });
//   }

//   getAllDepartmentList() {
//     this.jobService.getAllDepartments().subscribe((data: Department[]) => {
//       this.departments = data;
//       this.changeDetectorRefs.markForCheck();
//     });
//   }

//   getAllCurrencyList() {
//     this.jobService.getAllCurrencies().subscribe((data: Currency[]) => {
//       this.currencys = data;
//       this.changeDetectorRefs.markForCheck();
//     });
//   }

//   getAllRecruiterList() {
//     this.jobService.getAllRecruiters().subscribe((data: Recruiter[]) => {
//       this.recruiters = data;
//       this.changeDetectorRefs.markForCheck();
//     });
//   }

//   getAllClientList() {
//     this.jobService.getAllClients().subscribe((data: Client[]) => {
//       this.clients = data;
//       this.changeDetectorRefs.markForCheck();
//     });
//   }



//   updateJob() {
//     this.job.department = this.selectedDepartments;
//     this.job.recruiters = this.selectedRecruiters;
//     this.job.currney = this.selectedCurrencys;
//     this.job.type = this.selectedJobType;
//     this.job.clients = this.selectedClients;

//     this.jobService.updateJob(this.job).subscribe(
//       res => {
//         this.getAllJobList();
//         this.jobForm.reset();
//         this.router.navigateByUrl('/jobs');
//       },
//       (err: HttpErrorResponse) => {
//         if (err.error instanceof Error) {
//           console.log("Client-side error occurred.");
//         } else {
//           console.log("Server-side error occurred.");
//         }
//       }
//     );
//   }

//   onDepartmentChange(data: any) {
//     console.log("selected department:", data);
//     console.log("departments: " + JSON.stringify(this.selectedDepartments));
//   }

//   onRecruiterChange(data: any) {
//     console.log("selected recruiter:", data);
//     console.log("Recruiters: " + JSON.stringify(this.selectedRecruiters));
//   }

//   onCurrencyChange(data: any) {
//     console.log("selected currency:", data);
//     console.log("Currencies: " + JSON.stringify(this.selectedCurrencys));
//   }

//   onClientChange(data: any) {
//     console.log("selected client:", data);
//     console.log("clients: " + JSON.stringify(this.selectedClients));
//   }

//   todayDate(): string {
//     return new Date().toISOString().split('T')[0];
//   }

//     getAllLocationList() {
//           this.jobService.getAllLocations().subscribe((data: Location[]) => {
//             this.locations1 = data;
//             this.changeDetectorRefs.markForCheck();
//           });
//         }
//   }
