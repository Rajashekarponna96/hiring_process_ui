import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Candidate } from '../../../model/candidate';
import { NgForm } from '@angular/forms';
import { Education } from '../../../model/education';
import { Experience } from '../../../model/experience';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Source } from '../../../model/source';
import { Location } from '../../../model/location';
import { Currency } from '../../../model/currency';

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
source = new Source()
sources:Source[] | undefined
location =new Location()
// locations:Location[] | undefined
currency = new Currency();
currencies: Currency[] | undefined;
selectedSource: any;
selectedcurrentLocation:any;
selectedprefferedLocation:any;
selectedJobType: any;
showEducationFields: boolean = false;
showExperience: boolean = false;
// showEducationFieldstable: boolean = false;
    // education: any = {}; // Your education model, adjust as needed
    educationDetails: any[] = [];
    experienceDetails:any[] = [];


addSkill(){
  this.candidate.skills.push('');
}

removeSkill(i:number){
  this.candidate.skills.splice(0, 1);
}


sourceOptions: any[] = [
  { label: 'Select Source', value: null },
  { label: 'Naukari', value: 'naukari' },
  { label: 'Times.com', value: 'times' },
  { label: 'Linkdin', value: 'Linkdin' },
  { label: 'MONISTER', value: 'monister' },
  { label: 'REFFER', value: 'reffer' },
  { label: 'OTHERS', value: 'others' }
];
locations: any[] = [
  
  // { label :'select Location', value: null},
  // { label :'Hyderabad', value: 'hyderabad'},
  // { label :'Chennai', value: 'chennai'},
  // { label :'Banglore', value: 'banglore'},
  // { label :'Bombay', value: 'bombay'}
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
    this.candidate.experiences=this.experienceDetails
    this.candidate.educations=this.educationDetails
    console.log("this the selectedSource vlue  is:"+this.selectedSource)
    this.candidate.source=this.selectedSource
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

    getSourceList(){
      return this.http.get<Source[]>("http://localhost:9000/source/all");
    }
    getAllSourcesList(){
      return this.getSourceList().
      subscribe((data) => {
        console.log(data);
        this.sources=data;
        this.changeDetectorRefs.markForCheck();
     });
    }

    getLocationList(){
      return this.http.get<Location[]>("http://localhost:9000/location/all")
    }

    getAllLocationList(){
      return this.getLocationList().
      subscribe((data) => {
        console.log(data);
        this.locations=data;
        //this.currentLocationOptions = this.locations.map(location => ({ label: location.name, value: location.id }));
    
        this.changeDetectorRefs.markForCheck();
     });
    }

    getCurrencyList(){
      return this.http.get<Currency[]>("http:localhost//9000/currency/all")
    }
    getAllCurrencyList(){
      return this.getCurrencyList().
      subscribe((data) => {
        console.log(data);
        this.currencies=data;
        this.changeDetectorRefs.markForCheck();
     });
    }

    
    submitEducation() {
      // Validate the education details before adding to the table
      if (this.validateEducation()) {
          this.educationDetails.push({ ...this.education });
          // Optionally, you can clear the form fields after submission
          this.education = {
            course:"",
            branch:"",
            startOfCourse :"",
            endOfCourse:"",
            college:"",
            location:"",
            candidate:new Candidate(),
    
            
          };
      }
  }

  validateEducation(): boolean {
    // Add your validation logic here
    // Return true if the validation passes, otherwise false
    return true;
}

submitExceperience(){
  // Validate the education details before adding to the table
  if (this.validateExperience()) {
    this.experienceDetails.push({ ...this.experience });
    // Optionally, you can clear the form fields after submission
    // this.experience = {
    // company :"",
    // jobTitle:"",
    // currentlyWokring:false,
    // dateOfJoining:"",
    // dateOfRelieving:"",
    // location:new Location(),
    // candidate:new Candidate(),

      
    // };
}

}

validateExperience(): boolean {
  // Add your validation logic here
  // Return true if the validation passes, otherwise false
  return true;
}




   
    

  
  

  
  ngOnInit() {
      this.getAllCandidateList();
      this.getAllSourcesList();
      this.getAllLocationList();
      this.getAllCurrencyList();
     
  }

  
    
  }

  


function addSkill() {
  throw new Error('Function not implemented.');
}

