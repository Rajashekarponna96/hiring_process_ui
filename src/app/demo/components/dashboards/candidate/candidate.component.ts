import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Candidate } from '../../model/candidate';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { Pagination } from '../../model/pagination';
import { UserAccout } from '../../model/userAccount';
import { Vendor } from '../../model/vendor';
import { CandidateService } from 'src/app/demo/hiring-process-services/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {
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
  selectedFile: any;
  selectedFile1!: any;

  candidate: Candidate = new Candidate();
  selectedCandidate!: Candidate;
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  displayFilterFields = false;
  vendor!: Vendor;
  menuitems: MenuItem[] = [];
  temporaryStage!: string;
  showStages: boolean = false;
  stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived', 'Hold', 'Reject'];

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getvendorDetailsById();
  }

  handleEditcandidate(candidate: Candidate) {
    const candidateId = candidate.id;

    console.log("Candidate object:", candidate);
    // Instead of using local storage, navigate to the 'editcandidate' route with the candidate object as a parameter in the state
    this.router.navigate(['editcandidate'], { state: { candidateId: candidateId, candidate: candidate } });
  }

  navigateToCreateCandidate() {
    this.router.navigate(['createrecandidate']);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getAllCandidatesListForGlobalFilter(inputValue: any) {
    this.candidateService.searchCandidates(inputValue, 0, this.selectedRecordsOption1).subscribe((data) => {
      this.candidates = data.content;
      this.filteredCandidates = data.content;
    });
  }

  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.candidateService.searchCandidates(inputValue, 0, this.selectedRecordsOption1).subscribe((data) => {
      this.candidates = data.content;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.currentPage = 0;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllCandidateList() {
    this.candidateService.getAllCandidates().subscribe((data) => {
      this.candidates = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllCandidateListWithPagination() {
    this.candidateService.getCandidatesWithPagination(this.currentPage, this.selectedRecordsOption1).subscribe((data) => {
      this.candidates = data.content;
      this.pagination = data;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.changeDetectorRefs.markForCheck();
    });
  }

  handleEditCandidate(candidate: Candidate) {
    const candidateId = candidate.id;
    this.router.navigate(['editcandidate'], { state: { candidateId, candidate } });
  }

  candidateDelete(candidate: Candidate) {
    // this.candidateService.deleteCandidate(candidate.id).subscribe(
    //   () => {
    //     this.getAllCandidateListWithPagination();
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       console.log('Client-side error occurred.');
    //     } else {
    //       console.log('Server-side error occurred.');
    //     }
    //   }
    // );
  }

  openHiringFlow(candidate: Candidate) {
    localStorage.setItem('candidateid', JSON.stringify(candidate.id));
    this.router.navigate(['hiringflowactivity']);
  }

  toggleStages() {
    this.showStages = !this.showStages;
  }

  openNew(candidate: Candidate) {
    this.selectedCandidate = candidate;
    this.temporaryStage = candidate.stage;
    this.submitted = false;
    this.productDialog = true;
  }

  toggleFilter() {
    this.displayFilterFields = !this.displayFilterFields;
    if (!this.displayFilterFields) {
      this.dataTable.reset();
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  updateCandidate(candidate: Candidate, stage: string) {
    this.selectedCandidate.stage = this.temporaryStage;
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
    candidate.modifiedBy = user;

    this.candidateService.updateCandidate(candidate).subscribe(
      () => {
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

  getvendorDetailsById() {
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

    if (user.role?.name === 'vendor') {
      this.candidateService.getVendorDetailsByUserId(user.id).subscribe((data) => {
        this.vendor = data;
        this.getCandidatesByVendorId(this.vendor.id);
      });
    } else if (user.role?.name === 'admin' || user.role?.name === 'recruiter' || user.role?.name === 'candidate') {
      this.getAllCandidateListWithPagination();
    } else {
      console.log("User role not recognized or no action specified.");
    }
  }

  getCandidatesByVendorId(vendorId: any) {
    this.candidateService.getCandidatesByVendorId(vendorId, this.currentPage, this.selectedRecordsOption1).subscribe((data) => {
      this.candidates = data.content;
      this.pagination = data;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.changeDetectorRefs.markForCheck();
    });
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getvendorDetailsById();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getvendorDetailsById();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getvendorDetailsById();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getvendorDetailsById();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.getvendorDetailsById();
  }
}

