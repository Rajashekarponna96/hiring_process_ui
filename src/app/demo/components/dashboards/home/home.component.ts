import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Job } from '../../model/job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  jobs: any[] = []; // Assuming the API response will be an array of objects
  clientNames: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllJobs();
    this.getAllClientNames();
  }

  ngOnDestroy(): void {

  }

  getAllJobs(): void {
    this.http.get<any[]>('http://localhost:9000/job/summaries')
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
  getAllClientNames(): void {
    this.http.get<string[]>('http://localhost:9000/client/allclientnames')
      .subscribe(
        (response) => {
          this.clientNames = response;
        },
        (error) => {
          console.error('Error fetching client names:', error);
        }
      );
  }
}

