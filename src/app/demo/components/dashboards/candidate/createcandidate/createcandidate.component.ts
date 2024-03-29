import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Candidate } from '../../../model/candidate';
import { NgForm } from '@angular/forms';
import { Education } from '../../../model/education';
import { Experience } from '../../../model/experience';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Source } from '../../../model/source';
import { Location } from '../../../model/location';
import { Currency } from '../../../model/currency';
import { TalentPool } from '../../../model/talentpool';
import { Job } from '../../../model/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createcandidate',
  templateUrl: './createcandidate.component.html',
  styleUrls: ['./createcandidate.component.scss']
})
export class CreatecandidateComponent {

constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef,private router:Router) {

}
@ViewChild("candidateForm")
candidateForm!: NgForm 
candidate  = new Candidate() 
candidates:Candidate[] | undefined
education = new  Education()
experience =new Experience()
sources:Source[] =[]
locations:Location[] = []
talentpools:TalentPool[] = []
currencies: Currency[] = []
jobs : Job[] =[]
skills: string[] = [];
newSkill: string = '';
stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];


showEducationFields: boolean = false;
showExperience: boolean = false;

educationDetails: any[] = [];
experienceDetails:any[] = [];




addSkills(event?: any) {
  if (event) {
    const value = event.value;
    if (value && !this.skills.includes(value)) {
      this.skills.push(value);
      console.log("Added skill: " + value);
    }
  } else if (this.newSkill && !this.skills.includes(this.newSkill)) {
    this.skills.push(this.newSkill);
    console.log("Added skill: " + this.newSkill);
    this.newSkill = ''; // Clear the input field after adding a skill
  }
}

removeSkills(skill: string) {
  const index = this.skills.indexOf(skill);
  if (index !== -1) {
    this.skills.splice(index, 1);
  }
}

  

toggleEducationFields() {
    this.showEducationFields = !this.showEducationFields;
}
toggleExperienceFields() {
  this.showExperience = !this.showExperience;
}


cancel(){
  this.router.navigate(['/candidate'])

}
  addCandidate(){
    console.log("the candidate detailes are "+this.candidate)
    this.candidate.experiences=this.experienceDetails
    this.candidate.educations=this.educationDetails
    this.candidate.skills = this.skills
   
    this.http.post<Candidate>('http://localhost:9000/candidate/', this.candidate).subscribe(
        res => {
          console.log(res);
          this.getAllCandidateList();
          this.candidateForm.reset();
          this.educationDetails = ['']
          this.experienceDetails = ['']

  
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

    getTalentPoolList(){
      return this.http.get<TalentPool[]>("http://localhost:9000/talentPool/all")
    }

    getAllTalentPoolListt(){
      return this.getTalentPoolList().
      subscribe((data) => {
        console.log(data);
        this.talentpools=data;
        this.changeDetectorRefs.markForCheck();
     });
    }

    getJobList(){
      return this.http.get<Job[]>("http://localhost:9000/job/all")
    }
    getAllJobsList(){
      return this.getJobList().
      subscribe((data) => {
        console.log(data);
        this.jobs=data;
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
        this.currencies=data;
        this.changeDetectorRefs.markForCheck();
     });
    }

    deleteEducation(index: number) {
      this.educationDetails.splice(index, 1);
      }
      EditEducation(index: number) {
        const selectedEducation = this.educationDetails[index];
  
        // Set the fields to be edited
        this.education.course = selectedEducation.course;
        this.education.branch = selectedEducation.branch;
        this.education.startOfCourse = selectedEducation.startOfCourse;
        this.education.endOfCourse = selectedEducation.endOfCourse;
        this.education.college = selectedEducation.college;
        this.education.location = selectedEducation.location;
    
        // Set edit mode and selected index
        this.editMode = true;
        this.selectedIndex = index;
      }
      
      
    
    
  //   submitEducation() {
  //     // Validate the education details before adding to the table
  //     if (this.validateEducation()) {
  //         this.educationDetails.push({ ...this.education });
  //         // Optionally, you can clear the form fields after submission
  //         this.education = {
  //           course:"",
  //           branch:"",
  //           startOfCourse : new Date(),
  //           endOfCourse: new Date(),
  //           college:"",
  //           location:"",
  //           candidate:new Candidate(),
    
            
  //         };
  //     }
  // }

  submitEducation() {
    // Validate the experience details before adding or updating in the table
    if (this.validateEducation()) {
        if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
            // Update the existing experience details
            this.educationDetails[this.selectedIndex] = { ...this.education };
  
            // Reset edit mode and selected index
            this.editMode = false;
            this.selectedIndex = null;
        } else {
            // Check if the experience already exists
            const existingIndex = this.educationDetails.findIndex(edu => edu.course === this.education.course && edu.branch === this.education.branch);
  
            if (existingIndex !== -1) {
                // Update the existing experience details
                this.educationDetails[existingIndex] = { ...this.education };
            } else {
                // Add new experience details to the table
                this.educationDetails.push({ ...this.education });
            }
        }
  
        // Clear the form fields after submission
        this.clearEducationFields();
    }
  }
  clearEducationFields() {
    // Clear the form fields
    this.education = {
              course:"",
              branch:"",
              startOfCourse : new Date(),
              endOfCourse: new Date(),
              college:"",
              university:"",
              location:"",
              candidate:new Candidate(),
      
              
            };
    // Hide the education fields
    this.showEducationFields = false;
  }

  validateEducation(): boolean {
    // Add your validation logic here
    // Return true if the validation passes, otherwise false
    return true;
}
selectedIndex: number | null = null; // Index of the currently selected row for editing
submitExceperience() {
  // Validate the experience details before adding or updating in the table
  if (this.validateExperience()) {
      if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
          // Update the existing experience details
          this.experienceDetails[this.selectedIndex] = { ...this.experience };

          // Reset edit mode and selected index
          this.editMode = false;
          this.selectedIndex = null;
      } else {
          // Check if the experience already exists
          const existingIndex = this.experienceDetails.findIndex(exp => exp.company === this.experience.company && exp.jobTitle === this.experience.jobTitle);

          if (existingIndex !== -1) {
              // Update the existing experience details
              this.experienceDetails[existingIndex] = { ...this.experience };
          } else {
              // Add new experience details to the table
              this.experienceDetails.push({ ...this.experience });
          }
      }

      // Clear the form fields after submission
      this.clearExperienceFields();
  }
}
clearExperienceFields() {
  // Clear the form fields
  this.experience = {
      company: "",
      jobTitle: "",
      currentlyWokring: false,
      dateOfJoining: "",
      dateOfRelieving: "",
      location: "",
      candidate: new Candidate(),
  };
  // Hide the experience fields
  this.showExperience = false;
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
      this.getAllJobsList();
      this.getAllTalentPoolListt();
     
  }

  editMode: boolean = false; // Indicates whether the form is in edit mode

  editedExperienceIndex: number | null = null; // Index of the experience being edited
  editExperience(index: number) {
    // Get the selected experience
    const selectedExperience = this.experienceDetails[index];

    // Set the fields to be edited
    this.experience.company = selectedExperience.company;
    this.experience.jobTitle = selectedExperience.jobTitle;
    this.experience.currentlyWokring = selectedExperience.currentlyWokring;
    this.experience.dateOfJoining = selectedExperience.dateOfJoining;
    this.experience.dateOfRelieving = selectedExperience.dateOfRelieving;
    this.experience.location = selectedExperience.location;

    // Set edit mode and selected index
    this.editMode = true;
    this.selectedIndex = index;
}
deleteExperience(index: number) {
  // Remove the experience at the specified index from the experienceDetails array
  this.experienceDetails.splice(index, 1);
} 
    
  }

  


function addSkill() {
  throw new Error('Function not implemented.');
}

