import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Job } from '../../../model/job';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Department } from '../../../model/Department';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.scss']
})
export class CreatejobComponent {

  job: Job = new Job();
  jobs: Job[] = [];

  department =new Department()

  @ViewChild("jobForm")
  jobForm!: NgForm; 

selectedCurrency: any;
selectedJobType: any;
selectedDepartments: any; 

jobTypeOptions: any[] = [
  { label: 'Select job type', value: null },
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' }
];

departmentOptions:any[] =[
  { label: 'Select Department', value: null },
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' }
];

currencyOptions: any[]=[
  { label: 'Select CurrencyType', value: null },
  { label: 'Indian(INR)', value: 'INR' },
  { label: 'Euro (EUR)', value: 'EUR' },
  { label: 'United States Dollar (USD)' , value : 'USD'}

];
departments: any[] = [];
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

addJob() {

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

  ngOnInit() {
    this.getAllJobList();
    this.getAllDepartmentList();
  }
}

