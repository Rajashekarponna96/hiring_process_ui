import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, MenuItem, MegaMenuItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Candidate } from '../../../model/candidate';
import { Education } from '../../../model/education';
import { Experience } from '../../../model/experience';
import { UseraccountService } from 'src/app/demo/service/useraccount.service';
import { Vendor } from '../../../model/vendor';
import { HttpErrorResponse } from '@angular/common/http';
import { Currency } from '../../../model/currency';
import { Job } from '../../../model/job';
import { Source } from '../../../model/source';
import { TalentPool } from '../../../model/talentpool';
import { UserAccout } from '../../../model/userAccount';
import { Location } from '@angular/common';
import { CandidateService } from 'src/app/demo/hiring-process-services/candidate.service';

@Component({
  selector: 'app-createcandidate',
  templateUrl: './createcandidate.component.html',
  providers: [ConfirmationService, MessageService],
  styleUrls: ['./createcandidate.component.scss'],  // Use the CSS file for styles  providers: [ConfirmationService, MessageService],
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

export class CreateCandidateComponent implements OnInit {
  images: any[] = [];
  display = false;
  products: Product[] = [];
  selectedProduct: Product = {};
  visibleSidebar1 = false;
  visibleSidebar2 = false;
  visibleSidebar3 = false;
  visibleSidebar4 = false;
  visibleSidebar5 = false;
  email!: string;
  mobile!: string;
  breadcrumbItems: MenuItem[] = [];
  tieredItems: MenuItem[] = [];
  items: MenuItem[] = [];
  routeItems: MenuItem[] = [];
  megaMenuItems: MegaMenuItem[] = [];
  currentStep = 0;
  stepsItems: MenuItem[] = [];
  totalSteps = 4;
  createdBy!: UserAccout;
  itemss: any[] = [
    { label: 'Profile' },
    { label: 'Education' },
    { label: 'Experience' },
    { label: 'Confirm Details' }
  ];

  @ViewChild("candidateForm") candidateForm!: NgForm;
  candidate = new Candidate();
  candidates: Candidate[] | undefined;
  education = new Education();
  experience = new Experience();
  sources: Source[] = [];
  locations: Location[] = [];
  talentPools: TalentPool[] = [];
  currencies: Currency[] = [];
  jobs: Job[] = [];
  skills: string[] = [];
  newSkill = '';
  storedSkills = '';
  stages: any[] = [
    { "id": 1, "name": 'Sourced' },
    { "id": 2, "name": 'Screening' },
    { "id": 3, "name": 'Interview' },
    { "id": 4, "name": 'Preboarding' },
    { "id": 5, "name": 'Hired' },
    { "id": 6, "name": 'Archived' },
    { "id": 7, "name": 'Reject' },
    { "id": 8, "name": 'Hold' },
  ];

  showEducationFields = false;
  showExperience = false;
  educationDetails: any[] = [];
  experienceDetails: any[] = [];
  showSuccessMessage = false;
  userAccounts!: UserAccout[];
  userAccount = new UserAccout();
  vendor: Vendor = new Vendor();
  editMode!: boolean;
  selectedIndex: undefined;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private candidateService: CandidateService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllCandidateList();
    this.getAllSourcesList();
    this.getAllLocationList();
    this.getAllCurrencyList();
    this.getAllJobsList();
    this.getAllTalentPoolList();
  }

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
      this.candidate.skills = this.skills;
    }
  }

  cancel() {
    this.router.navigate(['/candidate']);
  }

  addCandidate() {
    this.candidate.experiences = this.experienceDetails;
    this.candidate.educations = this.educationDetails;
    this.candidate.skills = this.skills;

    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.candidate.createdBy = user;
    this.candidate.modifiedBy = user;

    if (user.role?.name === 'vendor') {
      this.getVendorDetailsBasedOnUserId(user.id);
    } else {
      this.saveCandidateWithVendor(null);
    }
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
    // this.selectedIndex = index;
  }


  deleteEducation(index: number) {
    this.educationDetails.splice(index, 1);
  }


  //
  submitEducation() {
    // Validate the experience details before adding or updating in the table
    if (this.validateEducation()) {
      if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
        // Update the existing experience details
        this.educationDetails[this.selectedIndex] = { ...this.education };

        // Reset edit mode and selected index
        this.editMode = false;
        //  this.selectedIndex = null;
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
      university: "",
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
  //
  //
  getVendorDetailsBasedOnUserId(userId: any) {
    this.candidateService.getVendorDetailsByUserId(userId).subscribe(
      data => {
        console.log("Vendor details:", data);
        if (data) {
          this.saveCandidateWithVendor(data);
        } else {
          console.log("Vendor details not found for the user.");
          this.saveCandidateWithVendor(null);
        }
      },
      error => {
        console.error("Error fetching vendor details:", error);
        this.saveCandidateWithVendor(null);
      }
    );
  }

  saveCandidateWithVendor(vendor: any) {
    this.candidate.vendor = vendor;
    this.candidateService.addCandidate(this.candidate).subscribe(
      res => {
        console.log(res);
        this.getAllCandidateList();
        this.candidateForm.reset();
        this.educationDetails = [];
        this.experienceDetails = [];
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
        this.router.navigate(['/candidate']);
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

  getAllCandidateList() {
    this.candidateService.getAllCandidates().subscribe(
      data => {
        this.candidates = data;
        this.changeDetectorRefs.markForCheck();
      },
      error => {
        console.error("Error fetching candidates:", error);
      }
    );
  }

  getAllSourcesList() {
    this.candidateService.getAllSources().subscribe(
      data => {
        this.sources = data;
      },
      error => {
        console.error("Error fetching sources:", error);
      }
    );
  }

  getAllLocationList() {
    this.candidateService.getAllLocations().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.error("Error fetching locations:", error);
      }
    );
  }

  getAllCurrencyList() {
    this.candidateService.getAllCurrencies().subscribe(
      data => {
        this.currencies = data;
      },
      error => {
        console.error("Error fetching currencies:", error);
      }
    );
  }

  getAllJobsList() {
    this.candidateService.getAllJobs().subscribe(
      data => {
        this.jobs = data;
      },
      error => {
        console.error("Error fetching jobs:", error);
      }
    );
  }

  getAllTalentPoolList() {
    this.candidateService.getAllTalentPools().subscribe(
      data => {
        this.talentPools = data;
      },
      error => {
        console.error("Error fetching talent pools:", error);
      }
    );
  } validateExperience(): boolean {
    // Check if any of the required fields are empty or if any other validation criteria are not met
    if (!this.experience.company || !this.experience.jobTitle || !this.experience.dateOfJoining || !this.experience.dateOfRelieving || !this.experience.location) {
      // Validation failed
      return false;
    }

    // Add additional validation logic as needed

    // If all validation passes, return true
    return true;
  }
  submitExceperience() {
    // Validate the experience details before adding or updating in the table
    if (this.validateExperience()) {
      if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
        // Update the existing experience details
        this.experienceDetails[this.selectedIndex] = { ...this.experience };

        // Reset edit mode and selected index
        this.editMode = false;
        //    this.selectedIndex = null;
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


  setCurrentStep(step: number) {
    this.currentStep = step;
  }



  // prevStep() {
  //   this.currentStep--;
  // }

  // nextStep() {
  //   this.currentStep++;
  // }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
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
    // this.selectedIndex = index;
  }
  deleteExperience(index: number) {
    // Remove the experience at the specified index from the experienceDetails array
    this.experienceDetails.splice(index, 1);
  }

}
