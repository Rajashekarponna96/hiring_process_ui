import { Component } from '@angular/core';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.scss']
})
export class CreatejobComponent {
job: any = {};
selectedCurrency: any;
currencyOptions: any;
selectedJobType: any;

jobTypeOptions: any[] = [
  { label: 'Select job type', value: null },
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' }
];


constructor() {}


}
