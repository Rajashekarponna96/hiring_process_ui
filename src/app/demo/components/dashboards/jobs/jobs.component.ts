import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../model/job';
import { Table } from 'primeng/table';
import { JobService } from './job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Pagination } from '../../model/pagination';
import { Location } from '../../model/location';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {


  job: Job = new Job();
  jobs: Job[] = [];
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;

  constructor(
    private jobService: JobService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  getAllJobs() {
    this.jobService.getJobListWithPagination(this.currentPage, this.selectedRecordsOption1)
      .subscribe((data: any) => {
        this.jobs = data.content;
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }

  ngOnInit() {
    this.getAllJobs();
  }

  handleEditJob(job: Job) {
    this.router.navigate(['editjob'], { state: { job: job } });
  }

  Jobdelete(job: Job) {
    this.jobService.deleteJob(job.id)
      .subscribe(
        (res) => {
          console.log(res);
          this.getAllJobs();
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

  navigateToCreateJob() {
    this.router.navigate(['createjob']);
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getAllJobs();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllJobs();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllJobs();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllJobs();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.getAllJobs();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.jobService.searchJobsByCode(inputValue, 0, this.selectedRecordsOption1)
      .subscribe((data: any) => {
        this.jobs = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0;
        this.changeDetectorRefs.markForCheck();
      });
  }
}

