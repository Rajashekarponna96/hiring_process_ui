import { ChangeDetectorRef, Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from '../../../model/job';
import { Department } from '../../../model/Department';
import { Currency } from '../../../model/currency';
import { Recruiter } from '../../../model/recruiter';
import { Client } from '../../../model/client';
import { Location } from '../../../model/location';
import { JobService } from '../job.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { locations2 } from '../../../model/locations2';
import { locations1 } from '../../../model/locations1';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.scss']
})
export class CreatejobComponent implements OnInit {
  job: Job = new Job();
  jobs: Job[] = [];
  currency = new Currency();
  department = new Department();
  client = new Client();
  recruiter = new Recruiter();

  @ViewChild("jobForm") jobForm!: NgForm;

  selectedJobType: any;
  selectedDepartments: any;
  selectedClients: any;
  selectedRecruiters: any;
  selectedCurrencys: any;


    types: any[] = [
      { "name": 'FullTime' },
      { "name": 'PartTime' },
      { "name": 'CONTRACT' },
      { "name": 'FreeLance' }
    ];

    departments: Department[] = [];
    clients: Client[] = [];
    recruiters: Recruiter[] = [];
    currencys: Currency[] = [];
    locations: Location[] = [];

    constructor(
      private jobService: JobService,

      private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef,
      private router: Router
    ) { }

    ngOnInit() {
      this.getAllJobList();
      this.getAllDepartmentList();
      this.getAllCurrencyList();
      this.getAllRecruiterList();
      this.getAllClientList();
      this.getAllLocationList();
    }

    getAllJobList() {
      this.jobService.getAllJobs().subscribe((data: Job[]) => {
        this.jobs = data;
        this.changeDetectorRefs.markForCheck();
      });
    }

    getAllDepartmentList() {
      this.jobService.getAllDepartments().subscribe((data: Department[]) => {
        this.departments = data;
        this.changeDetectorRefs.markForCheck();
      });
    }

    getAllCurrencyList() {
      this.jobService.getAllCurrencies().subscribe((data: Currency[]) => {
        this.currencys = data;
        this.changeDetectorRefs.markForCheck();
      });
    }

    getAllRecruiterList() {
      this.jobService.getAllRecruiters().subscribe((data: Recruiter[]) => {
        this.recruiters = data;
        this.changeDetectorRefs.markForCheck();
      });
    }

    getAllClientList() {
      this.jobService.getAllClients().subscribe((data: Client[]) => {
        this.clients = data;
        this.changeDetectorRefs.markForCheck();
      });
    }
    // locations2: locations2[] = [];
    getAllLocationList() {
      this.jobService.getAllLocations().subscribe((data: Location[]) => {
        this.locations = data;
        this.changeDetectorRefs.markForCheck();
      });
    }

    addJob() {
      this.job.department = this.selectedDepartments;
      this.job.recruiters = this.selectedRecruiters;
      this.job.currney = this.selectedCurrencys;
      this.job.clients = this.selectedClients;

      this.jobService.addJob(this.job).subscribe(
        res => {
          this.getAllJobList();
          this.jobForm.reset();
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

    onDepartmentChange(data: any) {
      console.log("selected department:", data);
      console.log("departments: " + JSON.stringify(this.selectedDepartments));
    }

    onRecruiterChange(data: any) {
      console.log("selected recruiter:", data);
      console.log("Recruiters: " + JSON.stringify(this.selectedRecruiters));
    }

    onCurrencyChange(data: any) {
      console.log("selected recruiter:", data);
      console.log("Recruiters: " + JSON.stringify(this.selectedCurrencys));
    }

    onClientChange(data: any) {
      console.log("selected client:", data);
      console.log("clients: " + JSON.stringify(this.selectedClients));
    }

    todayDate(): string {
      return new Date().toISOString().split('T')[0];
    }
  }

