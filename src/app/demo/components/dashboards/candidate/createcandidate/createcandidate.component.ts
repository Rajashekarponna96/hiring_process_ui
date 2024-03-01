import { Component, ViewChild } from '@angular/core';
import { Candidate } from '../../../model/candidate';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createcandidate',
  templateUrl: './createcandidate.component.html',
  styleUrls: ['./createcandidate.component.scss']
})
export class CreatecandidateComponent {
candidate  = new Candidate() 
candidates:Candidate[] | undefined
showExperience: boolean = false;

  @ViewChild("candidateForm")
  recruiterForm!: NgForm;
  selectedSource: any;
  showEducationSection:boolean =false;


sourceOptions: any[] = [
  { label: 'Select Source', value: null },
  { label: 'Naukari', value: 'naukari' },
  { label: 'Times.com', value: 'times' },
  { label: 'Linkdin', value: 'Linkdin' },
  { label: 'MONISTER', value: 'monister' },
  { label: 'REFFER', value: 'reffer' },
  { label: 'OTHERS', value: 'others' }
];

selectedcurrentLocation:any;

currentLocationOptions: any[] = [
  { label :'select Location' ,value:null},
  { label :'Hyderabad',value:'hyderabad'},
  { label :'Chennai',value:'chennai'},
  { label :'Banglore',value:'banglore'},
  { label :'Bombay',value:'bombay'}
];

selectedCurrency :any;

currencyOptions :any[] = [
  { label :'select Location' ,value:null},
  { label :'Rupess' ,value:'Rupess'}
  ];

  toggleEducationSection(){
    this.showEducationSection = !this.showEducationSection
  }

  

  


  onSubmit(){

  }

  onCancel(){

  }
  addCandidate(){
    
  }

  

}
