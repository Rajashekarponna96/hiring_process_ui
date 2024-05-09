import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { Education } from '../../model/education';
import { Experience } from '../../model/experience';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Source } from '../../model/source';
import { Location } from '../../model/location';
import { Currency } from '../../model/currency';
import { TalentPool } from '../../model/talentpool';
import { Job } from '../../model/job';
import { Candidate } from '../../model/candidate';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';
import { UserAccout } from '../../model/userAccount';


@Component({
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],

  providers: [ConfirmationService, MessageService],
  styles: [
    `
        .tab-menu {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .tab-menu button {
          background-color: #f4f4f4;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 16px;
          color: #333;
          transition: all 0.3s ease;
        }

        .tab-menu button:hover {
          background-color: #ddd;
        }

        .tab-menu button.active {
          background-color: #4346f1;
          color: #fff;
        }

        .step-content {
          margin-top: 20px;
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 5px;
          background-color: #f9f9f9;
        }

        h5 {
          margin-top: 0;
        }
        table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

/* Style table header */
th {
  background-color: #f2f2f2;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Style table rows */
tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

/* Style table data */
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

/* Style the edit and delete buttons */
.edit-btn, .delete-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.edit-btn:hover, .delete-btn:hover {
  background-color: #ddd;
}
      `
  ],

})


export class MenusComponent implements OnInit {


  constructor(private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private router: Router) {

  }

  //
  images: any[] = [];

  display: boolean = false;

  products: Product[] = [];

  selectedProduct: Product = {};

  visibleSidebar1: boolean = false;

  visibleSidebar2: boolean = false;

  visibleSidebar3: boolean = false;

  visibleSidebar4: boolean = false;

  visibleSidebar5: boolean = false;


  //

  breadcrumbItems: MenuItem[] = [];

  tieredItems: MenuItem[] = [];

  items: MenuItem[] = [];

  routeItems: MenuItem[] = [];

  megaMenuItems: MegaMenuItem[] = [];

  currentStep: number = 0;

  stepsItems: MenuItem[] = [];


  menuItems: MenuItem[] = [];

  totalSteps = 4;
  createdBy!: UserAccout;

  itemss: any[] = [
    { label: 'Profile' },
    { label: 'Education' },
    { label: 'Experience' },
    { label: 'Confirm Details' }
  ];



  @ViewChild("candidateForm")
  candidateForm!: NgForm
  candidate = new Candidate()
  candidates: Candidate[] | undefined
  education = new Education()
  experience = new Experience()
  sources: Source[] = []
  locations: Location[] = []
  talentpools: TalentPool[] = []
  currencies: Currency[] = []
  jobs: Job[] = []
  skills: string[] = [];
  newSkill: string = '';
  storedSkills: string = '';

  stages: any[] = [
    {
      "id": 1,
      "name": 'Sourced'
    },
    {
      "id": 2,
      "name": 'Screening'
    },
    {
      "id": 3,
      "name": 'Interview'
    },
    {
      "id": 4,
      "name": 'Preboarding'
    },
    {
      "id": 1,
      "name": 'Hired'
    },
    {
      "id": 1,
      "name": 'Archived'
    },
  ]



  showEducationFields: boolean = false;
  showExperience: boolean = false;

  educationDetails: any[] = [];
  experienceDetails: any[] = [];

  showSuccessMessage: boolean = false;

  userAccounts!: UserAccout[];



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
    debugger
    const index = this.skills.indexOf(skill);
    if (index === -1) {
      this.skills.splice(index, 1);
      this.candidate.skills = this.skills
    }
  }



  // toggleEducationFields() {
  //   this.showEducationFields = !this.showEducationFields;
  // }
  // toggleExperienceFields() {
  //   this.showExperience = !this.showExperience;
  // }


  cancel() {
    this.router.navigate(['/candidate'])

  }
  
  addCandidate() {
    console.log("the candidate detailes are " + this.candidate)
    this.candidate.experiences = this.experienceDetails
    this.candidate.educations = this.educationDetails
    this.candidate.skills = this.skills
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
    // this.createdBy = user;
    this.candidate.createdBy=user;

    this.http.post<Candidate>('http://localhost:9000/candidate/', this.candidate).subscribe(
      res => {
        console.log(res);
        this.getAllCandidateList();
        this.candidateForm.reset();
        this.educationDetails = ['']
        this.experienceDetails = ['']
        this.showSuccessMessage = true

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000); // Hide the message after 5 seconds (5000 milliseconds)

        this.router.navigate(['/candidate']);
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

  getCandidateList() {
    return this.http.get<Candidate[]>('http://localhost:9000/candidate/all');
  }

  getAllCandidateList() {
    return this.getCandidateList().
      subscribe((data) => {
        console.log(data);
        this.candidates = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getSourceList() {
    return this.http.get<Source[]>("http://localhost:9000/source/all");
  }
  getAllSourcesList() {
    return this.getSourceList().
      subscribe((data) => {
        console.log(data);
        this.sources = data;
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

  getTalentPoolList() {
    return this.http.get<TalentPool[]>("http://localhost:9000/talentPool/all")
  }

  getAllTalentPoolListt() {
    return this.getTalentPoolList().
      subscribe((data) => {
        console.log(data);
        this.talentpools = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getJobList() {
    return this.http.get<Job[]>("http://localhost:9000/job/all")
  }
  getAllJobsList() {
    return this.getJobList().
      subscribe((data) => {
        console.log(data);
        this.jobs = data;
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
        this.currencies = data;
        this.changeDetectorRefs.markForCheck();
      });
  }



  // submitEducation() {
  //   // Validate the education details before adding to the table
  //   if (this.validateEducation()) {
  //     this.educationDetails.push({ ...this.education });
  //     // Optionally, you can clear the form fields after submission
  //     this.education = {
  //       course: "",
  //       branch: "",
  //       startOfCourse: new Date(),
  //       endOfCourse: new Date(),
  //       college: "",
  //       location: "",
  //       candidate: new Candidate(),


  //     };
  //   }
  // }
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
    this.education.university = selectedEducation.university
    this.education.location = selectedEducation.location;


    // Set edit mode and selected index
    this.editMode = true;
    this.selectedIndex = index;
  }


  editMode: boolean = false; // Indicates whether the form is in edit mode

  editedExperienceIndex: number | null = null
  selectedIndex: number | null = null; // Index of the currently selected row for editing

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
      course: "",
      branch: "",
      startOfCourse: new Date(),
      endOfCourse: new Date(),
      college: "",
      location: "",
      university:"",
      candidate: new Candidate(),


    };
    // Hide the education fields
    this.showEducationFields = false;
  }




  validateEducation(): boolean {
    // Check if any of the fields are empty
    if (!this.education.course ||
        !this.education.branch ||
        !this.education.startOfCourse ||
        !this.education.endOfCourse ||
        !this.education.college ||
        !this.education.location) {
        // Throw an exception or handle validation failure
        throw new Error('All fields are required.');
        // Alternatively, you can return false to indicate validation failure
        // return false;
    }
    // Return true if all fields are filled
    return true;
}


  // submitExceperience() {
  //   // Validate the education details before adding to the table
  //   if (this.validateExperience()) {
  //     this.experienceDetails.push({ ...this.experience });
  //     // Optionally, you can clear the form fields after submission
  //     this.experience = {
  //       company: "",
  //       jobTitle: "",
  //       currentlyWokring: false,
  //       dateOfJoining: "",
  //       dateOfRelieving: "",
  //       location: "",
  //       candidate: new Candidate(),


  //     };
  //   }

  // }



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
    // Check if any of the required fields are empty or if any other validation criteria are not met
    if (!this.experience.company || !this.experience.jobTitle || !this.experience.dateOfJoining || !this.experience.dateOfRelieving || !this.experience.location) {
        // Validation failed
        return false;
    }

    // Add additional validation logic as needed

    // If all validation passes, return true
    return true;
}




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













  // end


  setCurrentStep(step: number) {
    this.currentStep = step;
  }



  prevStep() {
    this.currentStep--;
  }

  nextStep() {
    this.currentStep++;
  }

  // nextStep() {
  //   if (this.currentStep < this.totalSteps - 1) {
  //     this.currentStep++;
  //   }
  // }



  //
  confirm1() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?'
    });
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target || new EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  //
  durationInMonths: number | null = null;
  isInvalidDateRange(): boolean {
    if (!this.education.startOfCourse || !this.education.endOfCourse) {
      return false; // Wait until both dates are selected
    }
    const startDate = new Date(this.education.startOfCourse);
    const endDate = new Date(this.education.endOfCourse);
    this.durationInMonths = this.getMonthsDifference(startDate, endDate);
    return endDate <= startDate || this.durationInMonths <= 0;
  }

  getMonthsDifference(startDate: Date, endDate: Date): number {
    const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.44)); // average month duration
  }
  updateEndDateMinDate() {
    // Update the minimum allowed date for EndOfCourse based on the selected StartOfCourse
    if (this.education.startOfCourse) {
      const startDate = new Date(this.education.startOfCourse);
      const endDate = new Date(this.education.endOfCourse);
      if (endDate < startDate) {
        this.education.endOfCourse = this.education.startOfCourse;
      }
    }
  }

  durationInMonths1: number | null = null;
  isInvalidDateRange1(): boolean {
    if (!this.experience.dateOfJoining || !this.experience.dateOfRelieving) {
      return false; // Wait until both dates are selected
    }
    const startDate = new Date(this.experience.dateOfJoining);
    const endDate = new Date(this.experience.dateOfRelieving);
    this.durationInMonths = this.getMonthsDifference(startDate, endDate);
    return endDate <= startDate || this.durationInMonths <= 0;
  }

  getMonthsDifference1(startDate: Date, endDate: Date): number {
    const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.44)); // average month duration
  }
  updateEndDateMinDate1() {
    // Update the minimum allowed date for DateOfJoing based on the selected DateofRelieving
    if (this.experience.dateOfJoining) {
      const startDate = new Date(this.experience.dateOfJoining);
      if (this.experience.dateOfRelieving) {
        const endDate = new Date(this.experience.dateOfRelieving);
      
      if (endDate < startDate) {
        this.experience.dateOfRelieving = this.experience.dateOfJoining;
      }
    }
  }
}



  ngOnInit() {

    //
    this.productService.getProductsSmall().then(products => this.products = products);

    this.images = [];
    this.images.push({
      source: 'assets/demo/images/sopranos/sopranos1.jpg',
      thumbnail: 'assets/demo/images/sopranos/sopranos1_small.jpg', title: 'Sopranos 1'
    });
    this.images.push({
      source: 'assets/demo/images/sopranos/sopranos2.jpg',
      thumbnail: 'assets/demo/images/sopranos/sopranos2_small.jpg', title: 'Sopranos 2'
    });
    this.images.push({
      source: 'assets/demo/images/sopranos/sopranos3.jpg',
      thumbnail: 'assets/demo/images/sopranos/sopranos3_small.jpg', title: 'Sopranos 3'
    });
    this.images.push({
      source: 'assets/demo/images/sopranos/sopranos4.jpg',
      thumbnail: 'assets/demo/images/sopranos/sopranos4_small.jpg', title: 'Sopranos 4'
    });

    //
    this.routeItems = [
      { label: 'Candidate', routerLink: 'createrecandidate' },
      { label: 'Profile', routerLink: 'candidateprofile' },
      {
        label: 'Experiencne',
        routerLink: 'candidateexperiencne',
      },
      { label: 'Eeducation', routerLink: 'candidateeducation' }
    ];
    this.getAllCandidateList();
    this.getAllSourcesList();
    this.getAllLocationList();
    this.getAllCurrencyList();
    this.getAllJobsList();
    this.getAllTalentPoolListt();


  }

  // updateSkills(input: string) {
  //   // Split the input string by comma and trim each skill to remove any leading/trailing spaces
  //   const newSkills = input.split(',').map(skill => skill.trim());

  //   // Filter out empty skills
  //   this.skills = newSkills.filter(skill => skill !== '');

  //   this.candidate.skills = this.skills;
  // }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}

