import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataView } from 'primeng/dataview';
import { Job } from '../../model/job';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  jobs: any[] = []; // Assuming the API response will be an array of objects
  clientNames: { [clientId: string]: string } = {}; // Object to store client names by ID
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getAllJobsWithClients();
  }

  ngOnDestroy(): void {

  }
  getAllJobsWithClients(): void {
    this.http.get<any[]>('http://localhost:9000/job/all')
      .subscribe(
        (response) => {
          // Check if response is an array
          if (Array.isArray(response)) {
            this.jobs = response;
          } else {
            console.error('Invalid API response: Expected an array but received:', response);
          }
        },
        (error) => {
          console.error('Error fetching jobs:', error);
        }
      );
  }

  //


  handleViewJob(job: Job) {
    console.log('Job object to view:', job); // Log the job object
    // Navigate to the 'viewjob' route with the job object as a parameter in the state
    this.router.navigate(['jobview'], { state: { job: job } });
  }


  sortField: string = '';
  sortOptions: SelectItem[] = [
    { label: 'Recent Posts', value: 'share' },
    { label: 'Old Posts', value: 'comment' }
  ];


  //
  sortOrder: number = 0;
  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }


  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }


  //


}

