import { Component } from '@angular/core';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.scss']
})
export class CreatejobComponent {
job: any = {};
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

constructor() {}


}
