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

  handleEditJob(job: Job) {
    console.log(job.id);
    localStorage.setItem('id', String(job.id));
    console.log(job);
    localStorage.setItem('editJob', JSON.stringify(job));
    this.router.navigate(['editjob']);
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

  navigateToCreateJob(){
    this.router.navigate(['createjob'])
}
}
