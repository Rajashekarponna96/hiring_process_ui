import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HiringFlowActivity } from '../../../model/hiringFlowActivity';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Pagination } from '../../../model/pagination';
import { Candidate } from '../../../model/candidate';
import { MenuItem } from 'primeng/api';
import { UserAccout } from '../../../model/userAccount';
import { Vendor } from '../../../model/vendor';
import { Candidate2Service } from 'src/app/demo/service/Candidate2.service';

@Component({
  selector: 'app-candidateliststageswise',
  templateUrl: './candidateliststageswise.component.html',
  styleUrls: ['./candidateliststageswise.component.css']
})
export class CandidateliststageswiseComponent implements OnInit {
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
  selectedFile: any
  selectedFile1!: any;
  isCandidateLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isRecruiter: boolean = false;
  vendor!: Vendor;
  isVendor: boolean = false;
  candidateId!: number;
  hiringFlowActivity: HiringFlowActivity = new HiringFlowActivity();
  hiringFlowActivitys: HiringFlowActivity[] = [];
  currentStep: number = 0;
  candidate: Candidate = new Candidate();
  candidate1!: Candidate;
  selectededCandidate!: Candidate;
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  displayFilterFields = false;

  tabs: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived', 'Hold', 'Reject'];
  totalSteps = this.tabs.length;
  menuitems: MenuItem[] = [];
  temporaryStage!: string;
  stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived', 'Hold', 'Reject'];
  showStages: boolean = false;

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private candidateService: Candidate2Service
  ) { }

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
    this.getAllCandidateList();
  }

  navigateToCreateCandidate() {
    this.router.navigate(['menus']);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.candidateService.searchCandidates(inputValue, 0, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.candidates = data.content ?? [];
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0; // Reset to first page
        this.changeDetectorRefs.markForCheck();
      });
  }

  getAllCandidateList() {
    const stage = this.tabs[this.currentStep];
    this.candidateService.getCandidatesByStage(stage, this.currentPage, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.candidates = data.content ?? [];
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      }, (error) => {
        console.error('Error fetching candidate list:', error);
      });
  }

  handleEditcandidate(candidate: Candidate) {
    const candidateId = candidate.id;
    this.router.navigate(['editcandidate'], { state: { candidateId: candidateId, candidate: candidate } });
  }

  candidateDelete(candidate: Candidate) {
    // this.candidateService.deleteCandidate(candidate.id)
    //   .subscribe(
    //     (res) => {
    //       this.getAllCandidateList();
    //     },
    //     (err) => {
    //       console.error('Error deleting candidate:', err);
    //     }
    //   );
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
    candidate.modifiedBy = user;

    this.candidateService.updateCandidate(candidate)
      .subscribe(
        res => {
          this.productDialog = false;
          this.submitted = false;
          this.getvendorDetailsById();
        },
        err => {
          console.error('Error updating candidate:', err);
        }
      );
  }

  getvendorDetailsById() {
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

    if (user.role?.name === 'vendor') {
      this.isVendor = true;
      this.getVendorDetailBasedOnUserId(user.id);
    } else if (user.role?.name === 'admin') {
      this.isAdmin = true;
      this.getAllCandidateList();
    } else if (user.role?.name === 'recruiter') {
      this.isRecruiter = true;
      this.getAllCandidateList();
    } else if (user.role?.name === 'candidate') {
      this.isCandidateLoggedIn = true;
      this.getCandidatesByCandidateId(user.id);
    } else {
      console.log("User role not recognized or no action specified.");
    }
  }

  getVendorDetailBasedOnUserId(userId: any) {
    this.candidateService.getVendorByUserId(userId)
      .subscribe(
        (data) => {
          this.vendor = data;
          this.getCandidatesByVendorId(this.vendor.id);
        },
        err => {
          console.error('Error fetching vendor details:', err);
        }
      );
  }

  getCandidatesByVendorId(vendorId: any) {
    this.candidateService.getCandidatesByVendorId(vendorId, this.currentPage, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.candidates = data.content ?? [];
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

  getCandidatesByCandidateId(candidateId: any) {
    this.candidateService.getCandidatesByCandidateId(candidateId)
      .subscribe(
        (data) => {
          this.candidate1 = data;
        },
        err => {
          console.error('Error fetching candidate details:', err);
        }
      );
  }
}

