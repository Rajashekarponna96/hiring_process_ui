import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Recruiter } from '../../../model/recruiter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editrecruiter',
  templateUrl: './editrecruiter.component.html',
  styleUrls: ['./editrecruiter.component.scss']
})
export class EditrecruiterComponent implements OnInit {

  @ViewChild("recruiterForm")
  recruiterForm!: NgForm;

  recruiter = new Recruiter();
  recruiters: Recruiter[] = [];

  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private route: ActivatedRoute) { }

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     const recruiterId = params['id']; // Assuming the route parameter is named 'id'
  //     if (recruiterId) {
  //       this.getRecruiter(recruiterId);
  //     } else {
  //       console.error('Recruiter ID is not provided in the route parameters.');
  //     }
  //   });
  // }

  ngOnInit() {
    const stateData = history.state || {}; // Retrieve state data
    const recruiter = stateData.recruiter; // Get recruiter object from state

    if (recruiter) {
      this.recruiter = recruiter; // Assign recruiter object to component property
    } else {
      console.error('Recruiter data is missing in state.');
    }
  }

  getRecruiter(recruiterId: number) {
    this.http.get<Recruiter>('http://localhost:9000/recruiter/' + recruiterId).subscribe(
      (recruiter: Recruiter) => {
        this.recruiter = recruiter;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching recruiter details:', error.message);
      }
    );
  }

  // updateRecruiter() {
  //   this.http.put<Recruiter>('http://localhost:9000/recruiter/' + this.recruiter.id, this.recruiter).subscribe(
  //     res => {
  //       console.log('Recruiter updated successfully:', res);
  //       this.getAllRecruiters(); // Refresh the list of recruiters
  //       this.recruiterForm.reset();
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.error('Error updating recruiter:', err.message);
  //     }
  //   );
  // }
  updateRecruiter() {
    this.http.put<Recruiter>('http://localhost:9000/recruiter/' + this.recruiter.id, this.recruiter).subscribe(
      res => {
        console.log('Recruiter updated successfully:', res);
        this.getAllRecruiters(); // Refresh the list of recruiters
        this.recruiterForm.reset();

        // Redirect to the "/recruiter" route after successfully updating the recruiter
        this.router.navigateByUrl('/recruiter');
      },
      (err: HttpErrorResponse) => {
        console.error('Error updating recruiter:', err.message);
      }
    );
  }

  getAllRecruiters() {
    this.http.get<Recruiter[]>('http://localhost:9000/recruiter/all').subscribe(
      (data: Recruiter[]) => {
        this.recruiters = data;
        this.changeDetectorRefs.markForCheck();
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching recruiters:', error.message);
      }
    );
  }
}
