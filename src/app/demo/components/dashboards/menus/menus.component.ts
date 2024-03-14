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
          background-color: #007bff;
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

      `
  ],

})


export class MenusComponent implements OnInit {

  constructor(private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService,private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private router: Router) {

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

  currentStep: number = 1;

  stepsItems: MenuItem[] = [];


  menuItems: MenuItem[] = [];

  totalSteps = 4;






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
  stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];


  showEducationFields: boolean = false;
  showExperience: boolean = false;

  educationDetails: any[] = [];
  experienceDetails: any[] = [];




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


  cancel() {
    this.router.navigate(['/candidate'])

  }
  addCandidate() {
    console.log("the candidate detailes are " + this.candidate)
    this.candidate.experiences = this.experienceDetails
    this.candidate.educations = this.educationDetails
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



  submitEducation() {
    // Validate the education details before adding to the table
    if (this.validateEducation()) {
      this.educationDetails.push({ ...this.education });
      // Optionally, you can clear the form fields after submission
      this.education = {
        course: "",
        branch: "",
        startOfCourse: new Date(),
        endOfCourse: new Date(),
        college: "",
        location: "",
        candidate: new Candidate(),


      };
    }
  }

  validateEducation(): boolean {
    // Add your validation logic here
    // Return true if the validation passes, otherwise false
    return true;
  }

  submitExceperience() {
    // Validate the education details before adding to the table
    if (this.validateExperience()) {
      this.experienceDetails.push({ ...this.experience });
      // Optionally, you can clear the form fields after submission
      this.experience = {
        company: "",
        jobTitle: "",
        currentlyWokring: false,
        dateOfJoining: "",
        dateOfRelieving: "",
        location: "",
        candidate: new Candidate(),


      };
    }

  }

  validateExperience(): boolean {
    // Add your validation logic here
    // Return true if the validation passes, otherwise false
    return true;
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
}

function addSkill() {
  throw new Error('Function not implemented.');
}