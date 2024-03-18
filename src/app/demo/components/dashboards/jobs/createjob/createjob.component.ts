import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Job } from '../../../model/job';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Department } from '../../../model/Department';
import { Currency } from '../../../model/currency';
import { Recruiter } from '../../../model/recruiter';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.scss']
})
export class CreatejobComponent {


  job: Job = new Job();
  jobs: Job[] = [];

  currency = new Currency();
  //currencies: Currency[] | undefined;

  department =new Department()
  recruiter = new Recruiter()
  @ViewChild("jobForm")
  jobForm!: NgForm; 

//selectedCurrency: any;
selectedJobType: any;
selectedDepartments: any; 
selectedRecruiters:any;
selectedCurrencys:any;

types: any[] = [
{
  "id":1,
  "name":'FullTime'
},
{
  "id":2,
  "name":'PartTime'
}

]


departmentOptions:any[] =[
  { label: 'Select Department', value: null },
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' }
];

currencyOptions: any;
departments: any[] = [];
recruiters: any[] =[];
currencys: any[]=[];
constructor(private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef,private router: Router) {}

getJobList(){
  return this.http.get<Job[]>('http://localhost:9000/job/all');

}
getAllJobList(){
  return this.getJobList().
  subscribe((data) => {
     console.log(data);
     this.jobs=data;
     this.changeDetectorRefs.markForCheck();
  });
}

getDepartmentList(){
  return this.http.get<Department[]>("http://localhost:9000/department/all")
}

getAllDepartmentList(){
  return this.getDepartmentList().
  subscribe((data) => {
    console.log(data);
    this.departments=data;
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

getCurrencyList(){
  return this.http.get<Currency[]>("http://localhost:9000/currency/all")
}
getAllCurrencyList(){
  return this.getCurrencyList().
  subscribe((data) => {
    console.log(data);
    this.currencys=data;
    this.changeDetectorRefs.markForCheck();
 });
}


addJob() {

  this.job.department=this.selectedDepartments;
  this.job.recruiters=this.selectedRecruiters;
  this.job.currney=this.selectedCurrencys;
  this.http.post<Job>('http://localhost:9000/job/', this.job).subscribe(
      res => {
        console.log(res);
        this.getAllJobList();
        this.jobForm.reset();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        //this.service.typeWarning();

      });
    console.log(JSON.stringify(this.job));
    this.getAllJobList();

  }

  onDepartmentChange(data: any) {
   console.log("selected department:",data);
   console.log("departments.........."+JSON.stringify(this.selectedDepartments))
  }

  onRecruiterChange(data: any) {
    console.log("selected recruiter:",data);
    console.log("Recruiters.........."+JSON.stringify(this.selectedRecruiters))
    }

  onCurrencyChange(data: any) {
    console.log("selected recruiter:",data);
    console.log("Recruiters.........."+JSON.stringify(this.selectedCurrencys))
      }
    
  ngOnInit() {
    this.getAllJobList();
    this.getAllDepartmentList();
    this.getAllCurrencyList();
    this.getAllRecruiterList();
  }
}

