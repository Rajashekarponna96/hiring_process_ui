import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Job } from '../../model/job';
import { HomeService } from 'src/app/demo/service/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  jobs: Job[] = []; // Use Job[] to match the type returned by the service
  clientNames: { [clientId: string]: string } = {}; // Object to store client names by ID

  sortField: string = '';
  sortOptions: SelectItem[] = [
    { label: 'Recent Posts', value: 'share' },
    { label: 'Old Posts', value: 'comment' }
  ];
  sortOrder: number = 0;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllJobsWithClients();
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }

  getAllJobsWithClients(): void {
    this.homeService.getAllJobsWithClients().subscribe(
      (response) => {
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

  handleViewJob(job: Job) {
    console.log('Job object to view:', job); // Log the job object
    // Navigate to the 'viewjob' route with the job object as a parameter in the state
    this.router.navigate(['jobview'], { state: { job: job } });
  }

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
}

