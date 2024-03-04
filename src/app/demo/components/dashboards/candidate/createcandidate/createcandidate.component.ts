import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Candidate } from '../../../model/candidate';
import { NgForm } from '@angular/forms';
import { Education } from '../../../model/education';
import { Experience } from '../../../model/experience';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createcandidate',
  templateUrl: './createcandidate.component.html',
  styleUrls: ['./createcandidate.component.scss']
})
export class CreatecandidateComponent {

constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) {

}
@ViewChild("candidateForm")
candidateForm!: NgForm 
candidate  = new Candidate() 
candidates:Candidate[] | undefined
education = new  Education()
experience =new Experience()
selectedSource: any;
selectedcurrentLocation:any;
selectedprefferedLocation:any;
selectedJobType: any;
showEducationFields: boolean = false;
showExperience: boolean = false;


sourceOptions: any[] = [
  { label: 'Select Source', value: null },
  { label: 'Naukari', value: 'naukari' },
  { label: 'Times.com', value: 'times' },
  { label: 'Linkdin', value: 'Linkdin' },
  { label: 'MONISTER', value: 'monister' },
  { label: 'REFFER', value: 'reffer' },
  { label: 'OTHERS', value: 'others' }
];
currentLocationOptions: any[] = [
  { label :'select Location', value: null},
  { label :'Hyderabad', value: 'hyderabad'},
  { label :'Chennai', value: 'chennai'},
  { label :'Banglore', value: 'banglore'},
  { label :'Bombay', value: 'bombay'}
];

prefferedLocationOptions: any[] = [
  { label :'select Location', value: null},
  { label :'Hyderabad', value: 'hyderabad'},
  { label :'Chennai', value: 'chennai'},
  { label :'Banglore', value: 'banglore'},
  { label :'Bombay', value: 'bombay'}
];

selectedCurrency :any;

currencyOptions :any[] = [
  { label :'select Currency' ,value:null},
  { label :'Rupess' ,value:'Rupess'}
  ];

  jobTypeOptions: any[] = [
    { label: 'Select job type', value: null },
    { label: 'Full-time', value: 'full-time' },
    { label: 'Part-time', value: 'part-time' }
  ];
  

  toggleEducationFields() {
    this.showEducationFields = !this.showEducationFields;
}
toggleExperienceFields() {
  this.showExperience = !this.showExperience;
}

onSubmit(){

  }

  onCancel(){

  }
  addCandidate(){
    console.log("the candidate detailes are "+this.candidate)
    this.candidate.experiences=this.experience
    this.candidate.educations=this.education
    this.http.post<Candidate>('http://localhost:9000/candidate/', this.candidate).subscribe(
        res => {
          console.log(res);
          this.getAllCandidateList();
          this.candidateForm.reset();
  
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          //this.service.typeWarning();
  
        });
      console.log(JSON.stringify(this.candidate));
      this.getAllCandidateList();
  
    }

    getCandidateList(){
      return this.http.get<Candidate[]>('http://localhost:9000/candidate/all');
  }
  
  getAllCandidateList(){
      return this.getCandidateList().
      subscribe((data) => {
         console.log(data);
         this.candidates=data;
         this.changeDetectorRefs.markForCheck();
      });
    } 
    

  
  

  
  ngOnInit() {
      this.getAllCandidateList();
     
  }

  
    
  }

  


