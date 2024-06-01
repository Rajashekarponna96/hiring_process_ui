import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { Candidate } from '../../../model/candidate';
import { Pagination } from '../../../model/pagination';
import { UserAccout } from '../../../model/userAccount';
import { Vendor } from '../../../model/vendor';
import { CandidateService } from 'src/app/demo/hiring-process-services/candidate.service';

@Component({
  selector: 'app-talentpoolinactivecandidatelist',
  templateUrl: './talentpoolinactivecandidatelist.component.html',
  styleUrls: ['./talentpoolinactivecandidatelist.component.css']
})
export class TalentpoolinactivecandidatelistComponent implements OnInit {
  @ViewChild('dt') dataTable!: Table;
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
  selectededCandidate!: Candidate;
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  displayFilterFields = false;
  menuitems: MenuItem[] = [];
  temporaryStage!: string;
  stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];
  showStages: boolean = false;
  vendor!: Vendor;

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.getVendorDetailsById();
  }

  navigateToCreateCandidate() {
    this.router.navigate(['menus']);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.candidateService.searchCandidates(inputValue, 0, this.selectedRecordsOption1)
      .subscribe(data => {
        this.candidates = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0; // Reset to first page
        this.changeDetectorRefs.markForCheck();
      });
  }
  getAllCandidateList() {
    this.candidateService.getInactiveCandidates(this.currentPage, this.selectedRecordsOption1)
      .subscribe(data => {
        console.log('API Response:', data);  // Debugging statement
        this.candidates = data.content ?? []; // Provide a default empty array if data.content is undefined
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }


  handleEditcandidate(candidate: Candidate) {
    this.router.navigate(['editcandidate'], { state: { candidateId: candidate.id, candidate: candidate } });
  }

  candidateDelete(candidate: Candidate) {
    // this.candidateService.deleteCandidate(candidate.id)
    // .subscribe(() => this.getAllCandidateList());
  }

  openHiringFlow(candidate: Candidate) {
    localStorage.setItem('candidateid', JSON.stringify(candidate.id));
    this.router.navigate(['hiringflowactivity']);
  }

  toggleStages() {
    this.showStages = !this.showStages;
  }

  openNew(candidate: Candidate) {
    this.selectededCandidate = candidate;
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
    this.selectededCandidate.stage = this.temporaryStage;
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.candidate.modifiedBy = user;

    this.candidateService.updateCandidate(candidate)
      .subscribe(() => {
        this.productDialog = false;
        this.submitted = false;
      });
  }

  getVendorDetailsById() {
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

    if (user.role?.name === 'vendor') {
      this.candidateService.getVendorByUserId(user.id)
        .subscribe(data => {
          this.vendor = data;
          this.getCandidatesByVendorId(this.vendor.id);
        });
    } else if (user.role?.name === 'admin' || user.role?.name === 'recruiter') {
      this.getAllCandidateList();
    } else {
      console.log("User role not recognized or no action specified.");
    }
  }

  getCandidatesByVendorId(vendorId: any) {
    this.candidateService.getCandidatesByVendorId(vendorId, this.currentPage, this.selectedRecordsOption1)
      .subscribe(data => {
        this.candidates = data.content;
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getVendorDetailsById();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getVendorDetailsById();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getVendorDetailsById();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getVendorDetailsById();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.getVendorDetailsById();
  }
}

