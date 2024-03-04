import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../model/job';
import { HttpClient } from '@angular/common/http';

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

  ngOnInit() {
    this.getAllJobList();
  }

  navigateToCreateJob(){
    this.router.navigate(['createjob'])
}
}
