import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/demo/api/customer';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent {
  customers: Customer[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCreateRecruiter(){
    this.router.navigate(['createrecruiter'])
}

}
