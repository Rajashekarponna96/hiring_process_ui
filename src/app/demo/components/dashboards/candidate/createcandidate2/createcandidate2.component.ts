import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HiringFlowActivity } from '../../../model/hiringFlowActivity';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Pagination } from '../../../model/pagination';
import { Candidate } from '../../../model/candidate';
import { MenuItem } from 'primeng/api';
import { UserAccout } from '../../../model/userAccount';
import { Vendor } from '../../../model/vendor';



@Component({
  selector: 'app-createcandidate2',
  templateUrl: './createcandidate2.component.html',
  styleUrls: ['./createcandidate2.component.css']
})
export class Createcandidate2Component implements OnInit {

  candidateId!: number;

  hiringFlowActivity: HiringFlowActivity = new HiringFlowActivity();
  hiringFlowActivitys: HiringFlowActivity[] = [];

  currentStep: number = 0; 
  tabs: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived','Hold','Reject'];
  totalSteps = this.tabs.length;

  
  ngOnInit(): void {
    this.getvendorDetailsById();

  }

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
  goToStep(step: number) {
    this.currentStep = step;
    //this.tabs[this.currentStep];
    this.getAllCandidateList();
    //this.getvendorDetailsById();
  }

  

  




  


  @ViewChild('dt')
    dataTable!: Table;
    submitted: boolean = false;
    productDialog: boolean = false;
    fetchedCandidateStage!: string;
    pagination!: Pagination;
    totalElements: number = 0;
    totalPages: number = 0;
    currentPage: number = 0;
    selectedRecordsOption1: number = 5;
    message: string = '';
    selectedFile:any
    selectedFile1!:any;
    isCandidateLoggedIn: boolean = false;
    isAdmin :boolean =false;
    isRecruiter :boolean =false;
    isVendor :boolean =false;



    constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) {

     }


    candidate: Candidate = new Candidate();
    candidate1!: Candidate;
    selectededCandidate!: Candidate;
    candidates: Candidate[] = [];
    filteredCandidates: Candidate[] = [];
    displayFilterFields = false;

    navigateToCreateCandidate() {
        this.router.navigate(['menus'])

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    // onGlobalFilter1(event: Event){
    //     return this.http.get<Candidate[]>('http://localhost:9000/candidate/candidates');

    // }
    // getAllCandidatesListForGlobelFilter(){
    //     return this.getCandidateList().
    //         subscribe((data) => {
    //             console.log(data);
    //             this.candidates = data;
    //             console.log("candidate list are" + this.candidates)
    //             this.changeDetectorRefs.markForCheck();
    //         });

    // }

    // getAllCandidatesListForGlobalFilter(inputValue: any) {
    //     this.http.get<Candidate[]>('http://localhost:9000/candidate/candidates?firstName=this.inputValue&lastName=this.inputValue&email=this.inputValue')
    //         .subscribe((data) => {
    //             console.log(data);
    //             this.candidates = data;
    //             this.filteredCandidates = data; // Initialize filteredCandidates with all candidates
    //         });
    // }

    getAllCandidatesListForGlobalFilter(inputValue: any) {
        this.http.get<Candidate[]>('http://localhost:9000/candidate/candidates?firstName=this.inputValue&lastName=this.inputValue&email=this.inputValue')
            .subscribe((data) => {
                console.log(data);
                this.candidates = data;
                this.filteredCandidates = data; // Initialize filteredCandidates with all candidates
            });
    }

    onGlobalFilter1(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;
        console.log('Input Value:', inputValue);
        this.http.get<any>('http://localhost:9000/candidate/searchpage', {
          params: {
            code: inputValue,
            page: '0', // Reset to first page when applying filter
            size: this.selectedRecordsOption1.toString()
          }
        }).subscribe((data) => {
          this.candidates = data["content"];
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
          this.currentPage = 0; // Reset to first page
          this.changeDetectorRefs.markForCheck();
        });
      }

    getCandidateList() {
        return this.http.get<Candidate[]>('http://localhost:9000/candidate/all');
    }

    getAllCandidate() {
        return this.getCandidateList().
            subscribe((data) => {
                console.log(data);
                this.candidates = data;
                console.log("candidate list are" + this.candidates)
                this.changeDetectorRefs.markForCheck();
            });
    }

    getAllCandidateList() {
      const stage = this.tabs[this.currentStep];
      const apiUrl = `http://localhost:9000/candidate/candidateStage1/${stage}`;
    
      this.http.get<any>(apiUrl, {
        params: {
          page: this.currentPage.toString(),
          size: this.selectedRecordsOption1.toString()
        }
      }).subscribe((data) => {
        this.candidates = data.content;
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      }, (error) => {
        console.error('Error fetching candidate list:', error);
      });
    }

    handleEditcandidate(candidate: Candidate) {
     const candidateId=candidate.id;

        console.log("Candidate object:", candidate);
        // Instead of using local storage, navigate to the 'editcandidate' route with the candidate object as a parameter in the state
        this.router.navigate(['editcandidate'], { state: { candidateId: candidateId, candidate: candidate } });
    }

    candidateDelete(candidate: Candidate) {

        console.log("candidate is is:" + candidate.id)
        this.http
            .delete<Candidate[]>(
                'http://localhost:9000/candidate/' + candidate.id
            )
            .subscribe(
                (res) => {
                    console.log(res);
                    this.getAllCandidateList();
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log('Client-side error occurred.');
                    } else {
                        console.log('Server-side error occurred.');
                    }
                }
            );

    }

    openHiringFlow(candidate:Candidate) {
      localStorage.setItem('candidateid',JSON.stringify(candidate.id));
      this.router.navigate(['hiringflowactivity']);
    }

    menuitems: MenuItem[] = [];
    temporaryStage!: string; 

    stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived','Hold','Reject'];
    showStages: boolean = false;

    toggleStages() {
      this.showStages = !this.showStages;
    }
    openNew(candidate:Candidate) {
        console.log("candidate dertails for stage:"+candidate.email)
       //this.candidate.stage = candidate.stage
       this.selectededCandidate =candidate;
       this.temporaryStage = candidate.stage;
        this.submitted = false;
        this.productDialog = true;
    }


    toggleFilter() {
        this.displayFilterFields = !this.displayFilterFields;
        if (!this.displayFilterFields) {
          // Reset filtering
          this.dataTable.reset();
        }
      }

      hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }


    updateCandidate(candidate:Candidate,stage:string) {debugger

       //candidate.stage  = stage;
       this.selectededCandidate.stage = this.temporaryStage;
       console.log("Candidate updated:", this.selectededCandidate, "New Stage:", this.temporaryStage);
       const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
       //this.modifiedBy = user;
       candidate.modifiedBy=user;

        this.http.put<Candidate>('http://localhost:9000/candidate/' + candidate.id, candidate).subscribe(
          res => {
            console.log(res);
            this.productDialog = false;
            this.submitted = false;
            this.getvendorDetailsById();
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occurred:", err.error.message);
            } else {
              console.log("Server-side error occurred:", err.status, err.message);
            }
          }
        );
      }





// added myc code login based on vendor login cand list only related vemdor list no other list and recriter login all ;and admin all

// ngOnInit() {
//    // this.getAllCandidateList();
//   this.getvendorDetailsById();

// }
vendor!: Vendor;
getvendorDetailsById() {
  

  const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

  // Checking if the user is a vendor
  if (user.role?.name === 'vendor') {
    this.isVendor = true;
    this.getVendorDetailBasedOnUserId(user.id);
  }
  else if (user.role?.name === 'admin') { // If user is admin
    this.isAdmin =  true;
    this.getAllCandidateList(); // Call method to get all candidates
  }
  else if (user.role?.name === 'recruiter') { // If user is recruiter
    console.log("User is a recruiter.");
    this.isRecruiter = true;
    this.getAllCandidateList(); // Call method to get all candidates for recruiters
  } 
  else if (user.role?.name === 'candidate') { // If user is admin
    //this.getAllCandidateList(); // Call method to get all candidates

    this.isCandidateLoggedIn =true
    this.getCandidatesByCandidateId(user.id);
  }
  else { // If user role is not recognized or no action specified
    console.log("User role not recognized or no action specified.");
  }
  
}
// Method to get vendor details based on user ID
getVendorDetailBasedOnUserId(userId: any) {
  this.http.get<any>("http://localhost:9000/vendor/user/" + userId).subscribe(
    (data) => {
      console.log("Vendor details:", data);
      this.vendor = data;
      this.getCandidatesByVendorId(this.vendor.id)

    },

  );


}

getCandidatesByVendorId(vendorId: any) {
  debugger;
  this.http.get<any>('http://localhost:9000/vendor/candidates/' + vendorId, {
    params: {
      page: this.currentPage.toString(),
      size: this.selectedRecordsOption1.toString()
    }
  }).subscribe((data) => {
    this.candidates = data.content;
    this.pagination = data;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.changeDetectorRefs.markForCheck();
  });
}

goToFirstPage() {
  this.currentPage = 0;
  //this.getAllCandidateList();
  this.getvendorDetailsById();
}

goToPreviousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    //this.getAllCandidateList();
    this.getvendorDetailsById();
  }
}

goToNextPage() {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    // this.getAllCandidateList();
    this.getvendorDetailsById();
  }
}

goToLastPage() {
  this.currentPage = this.totalPages - 1;
  //this.getAllCandidateList();
  this.getvendorDetailsById();
}

onRecordsPerPageChange(event: Event) {
  this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
  this.currentPage = 0; // Reset to first page when changing page size
  //this.getAllCandidateList();
  this.getvendorDetailsById();
}



getCandidatesByCandidateId(candiadteId: any) {
  debugger;
  
  this.http.get<any>("http://localhost:9000/candidate/userid/" + candiadteId).subscribe(
    (data) => {
      console.log("Vendor details:", data);
      this.candidate1 = data;
      

    }

  );


}


}
