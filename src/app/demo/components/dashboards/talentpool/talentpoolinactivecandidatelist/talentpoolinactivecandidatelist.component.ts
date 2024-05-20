
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { Candidate } from '../../../model/candidate';
import { Pagination } from '../../../model/pagination';
import { UserAccout } from '../../../model/userAccount';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-talentpoolinactivecandidatelist',
  templateUrl: './talentpoolinactivecandidatelist.component.html',
  styleUrls: ['./talentpoolinactivecandidatelist.component.css']
})
export class TalentpoolinactivecandidatelistComponent implements OnInit {
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



  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) {

  }


  candidate: Candidate = new Candidate();
  selectededCandidate!: Candidate;
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  displayFilterFields = false;

  // navigateToCreateCandidate() {
  //   this.router.navigate(['menus'])

  // }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }


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
    this.http.get<any>('http://localhost:9000/candidate/candidatelistwithpagination', {

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

  temporaryStage!: string;

  stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];
  showStages: boolean = false;

  toggleStages() {
    this.showStages = !this.showStages;
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


  updateCandidate(candidate: Candidate, stage: string) {
    debugger

    //candidate.stage  = stage;
    this.selectededCandidate.stage = this.temporaryStage;
    console.log("Candidate updated:", this.selectededCandidate, "New Stage:", this.temporaryStage);
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
    //this.modifiedBy = user;
    this.candidate.modifiedBy = user;

    this.http.put<Candidate>('http://localhost:9000/candidate/' + candidate.id, candidate).subscribe(
      res => {
        console.log(res);
        this.productDialog = false;
        this.submitted = false;
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




  ngOnInit() {
    // this.getAllCandidateList();
    this.getvendorDetailsById();

  }
  vendor!: Vendor;
  getvendorDetailsById() {
    debugger;

    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

    // Checking if the user is a vendor
    if (user.role?.name === 'vendor') {
      this.getVendorDetailBasedOnUserId(user.id);
    }
    else if (user.role?.name === 'admin') { // If user is admin
      this.getAllCandidateList(); // Call method to get all candidates
    }
    else if (user.role?.name === 'recruiter') { // If user is recruiter
      console.log("User is a recruiter.");
      this.getAllCandidateList(); // Call method to get all candidates for recruiters
    } else { // If user role is not recognized or no action specified
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















}


