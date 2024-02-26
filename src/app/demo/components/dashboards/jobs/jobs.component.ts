import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/demo/api/customer';

@Component({
  //selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  //styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCreateJob(){
    this.router.navigate(['createjob'])
}
}
