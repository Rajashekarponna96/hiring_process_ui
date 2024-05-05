import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../model/job';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Pagination } from '../../model/pagination';

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

  constructor(private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef,private router: Router) { }

  getJobList(){
    return this.http.get<Job[]>('http://localhost:9000/job/all');

  }
  getAllJobs(){
    return this.getJobList().
    subscribe((data) => {
       console.log(data);
       this.jobs=data;
       this.changeDetectorRefs.markForCheck();
    });
  }

//   handleEditJob(job: Job) {
//     console.log(job.id);
//     localStorage.setItem('id', String(job.id));
//     console.log(job);
//     localStorage.setItem('editJob', JSON.stringify(job));
//     this.router.navigate(['editjob']);
// }
handleEditJob(job: Job) {
  console.log('Job object to edit:', job); // Log the job object
  // Navigate to the 'editjob' route with the job object as a parameter in the state
  this.router.navigate(['editjob'], { state: { job: job } });
}


  Jobdelete(job: Job) {
    debugger;
    this.http
        .delete<Job>(
            'http://localhost:9000/job/' + job.id
        )
        .subscribe(
            (res) => {
                console.log(res);
                this.getAllJobList();
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

getAllJobList() {
  this.http.get<any>('http://localhost:9000/job/joblistwithpagination', {

    params: {
      page: this.currentPage.toString(),
      size: this.selectedRecordsOption1.toString()
    }
  }).subscribe((data) => {
    this.jobs = data.content;
    this.pagination = data;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.changeDetectorRefs.markForCheck();
  });
}

  ngOnInit() {
    this.getAllJobList();
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
  console.log('Input Value:', inputValue);
  this.http.get<any>('http://localhost:9000/job/searchpage', {
    params: {
      code: inputValue,
      page: '0', // Reset to first page when applying filter
      size: this.selectedRecordsOption1.toString()
    }
  }).subscribe((data) => {
    this.jobs = data["content"];
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.currentPage = 0; // Reset to first page
    this.changeDetectorRefs.markForCheck();
  });
}

  navigateToCreateJob(){
    this.router.navigate(['createjob'])
}


goToFirstPage() {
  this.currentPage = 0;
  this.getAllJobList()
}

goToPreviousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.getAllJobList()
  }
}

goToNextPage() {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.getAllJobList()
  }
}

goToLastPage() {
  this.currentPage = this.totalPages - 1;
  this.getAllJobList()
}

onRecordsPerPageChange(event: Event) {
  this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
  this.currentPage = 0; // Reset to first page when changing page size
  this.getAllJobList()
}

}
