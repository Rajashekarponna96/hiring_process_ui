import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../model/job';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
 job: Job = new Job();
 jobs: Job[] = [];

  constructor(private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef,private router: Router) { }

  getJobList(){
    return this.http.get<Job[]>('http://localhost:9000/job/all');

  }
  getAllJobList(){
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

  ngOnInit() {
    this.getAllJobList();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
}

onGlobalFilter1(event: any) {
  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;
  console.log('Input Value:', inputValue);
  this.http.get<any>('http://localhost:9000/job/searchpage', {
      params: {
          // firstName: inputValue,
          // lastName:inputValue,
          // email: inputValue
          code:inputValue,
          page: 0,
          size: 3
      }
  }).subscribe((data) => {

      this.jobs = data["content"]
       this.changeDetectorRefs.markForCheck();
  });

  // this.getAllCandidatesListForGlobalFilter(inputValue);


}

  navigateToCreateJob(){
    this.router.navigate(['createjob'])
}


goToFirstPage(){};
goToPreviousPage(){};
goToNextPage(){};
goToLastPage(){};
}
