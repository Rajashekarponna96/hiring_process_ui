import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Job } from '../../../model/job';
import { Department } from '../../../model/Department';
import { Currency } from '../../../model/currency';
import { Recruiter } from '../../../model/recruiter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Client } from '../../../model/client';

@Component({
  selector: 'app-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['./editjob.component.scss']
})
export class EditjobComponent {

  @ViewChild("jobForm")
  jobForm!: NgForm;

  job: Job = new Job();
  jobs: Job[] = [];

  client = new Client();
  selectedClients:any;
  clients:any[] =[];

  department = new Department()
  selectedDepartments: any;
  departments: any[] = [];


  currency = new Currency();
  selectedCurrencys: any;
  currencys: any[] = [];

  types: any[] = [
    {
      
      "name": 'FullTime'
    },
    {
      
      "name": 'PartTime'
    },
    {
      
      "name": 'CONTRACT'
    },
    {
      
      "name": 'FreeLance'
    },

  ]

  selectedJobType: any;

  recruiter = new Recruiter()
  selectedRecruiters: any;
  recruiters: any[] = [];
  locations: Location[] = []
  constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }


  onDepartmentChange(data: any) {
    console.log("selected department:", data);
    console.log("departments.........." + JSON.stringify(this.selectedDepartments))
  }

  onRecruiterChange(data: any) {
    console.log("selected recruiter:", data);
    console.log("Recruiters.........." + JSON.stringify(this.selectedRecruiters))
  }

  onCurrencyChange(data: any) {
    console.log("selected recruiter:", data);
    console.log("Recruiters.........." + JSON.stringify(this.selectedCurrencys))
  }
  onClientChange(data: any) {
    console.log("selected client:", data);
    console.log("clients.........." + JSON.stringify(this.selectedClients))
  }

  getJobList() {
    return this.http.get<Job[]>('http://localhost:9000/job/all');

  }
  getAllJobList() {
    return this.getJobList().
      subscribe((data) => {
        console.log(data);
        this.jobs = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getDepartmentList() {
    return this.http.get<Department[]>("http://localhost:9000/department/all")
  }

  getAllDepartmentList() {
    return this.getDepartmentList().
      subscribe((data) => {
        console.log(data);
        this.departments = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getRecruiterList() {
    return this.http.get<Recruiter[]>('http://localhost:9000/recruiter/all');

  }
  getAllRecruiterList() {
    return this.getRecruiterList().
      subscribe((data) => {
        console.log(data);
        this.recruiters = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getCurrencyList() {
    return this.http.get<Currency[]>("http://localhost:9000/currency/all")
  }
  getAllCurrencyList() {
    return this.getCurrencyList().
      subscribe((data) => {
        console.log(data);
        this.currencys = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getClientList() {
    return this.http.get<Client[]>('http://localhost:9000/client/all');

  }
  getAllClientList() {
    return this.getClientList().
      subscribe((data) => {
        console.log(data);
        this.clients = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getLocationList() {
    return this.http.get<Location[]>("http://localhost:9000/location/all")
  }

  getAllLocationList() {
    return this.getLocationList().
      subscribe((data) => {
        console.log(data);
        this.locations = data;
        //this.currentLocationOptions = this.locations.map(location => ({ label: location.name, value: location.id }));

        this.changeDetectorRefs.markForCheck();
      });
  }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
  // ngOnInit() {
  //   this.getAllJobList();
  //   this.getAllDepartmentList();
  //   this.getAllCurrencyList();
  //   this.getAllRecruiterList();
  //   this.job = JSON.parse(localStorage.getItem('editJob') || '{}')
  //   this.selectedDepartments=this.job.department;
  //   this.selectedCurrencys=this.job.currney;
  //   this.selectedRecruiters=this.job.recruiters;
  //   this.selectedJobType=this.job.type;
  // }
  ngOnInit() {
    debugger;
    const stateData = history.state || {}; // Retrieve state data
    const job = stateData.job; // Get job object from state

    if (job) {
      this.job = job; // Assign job object to component property
      this.selectedDepartments = this.job.department;
      this.selectedCurrencys = this.job.currney;
      this.selectedRecruiters = this.job.recruiters;
      this.selectedJobType = this.job.type;
      this.selectedClients=this.job.clients;
    } else {
      console.error('Job data is missing in state.');
    }

    // Call other methods like getAllJobList(), getAllDepartmentList(), etc. if needed

    this.getAllJobList();
    this.getAllDepartmentList();
    this.getAllCurrencyList();
    this.getAllRecruiterList();
    this.getAllClientList();
    this.getAllLocationList();
  }



  // updateJob() {
  //   this.job.department = this.selectedDepartments;
  //   this.job.recruiters = this.selectedRecruiters;
  //   this.job.currney = this.selectedCurrencys;
  //   this.job.type = this.selectedJobType;
  //   this.http.put<Job>('http://localhost:9000/job/' + this.job.id, this.job).subscribe(
  //     res => {
  //       console.log(res);
  //       this.getAllJobList();
  //       this.jobForm.reset();
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         console.log("Client-side error occured.");
  //       } else {
  //         console.log("Server-side error occured.");
  //       }

  //     });
  //   console.log(JSON.stringify(this.recruiter));
  // }
  updateJob() {
    this.job.department = this.selectedDepartments;
    this.job.recruiters = this.selectedRecruiters;
    this.job.currney = this.selectedCurrencys;
    this.job.type = this.selectedJobType;
    this.job.clients=this.selectedClients;

    this.http.put<Job>('http://localhost:9000/job/' + this.job.id, this.job).subscribe(
      res => {
        console.log(res);
        this.getAllJobList();
        this.jobForm.reset();

        // Redirect to the "/jobs" route after successfully updating the job
        this.router.navigateByUrl('/jobs');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occurred.");
        } else {
          console.log("Server-side error occurred.");
        }
      }
    );
  }
}
