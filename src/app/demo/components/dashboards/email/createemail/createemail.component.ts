import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CandidateEmail } from '../../../model/candidateEmail';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createemail',
  templateUrl: './createemail.component.html',
  styleUrls: ['./createemail.component.scss']
})
export class CreateemailComponent {

  candidateEmail: CandidateEmail = new CandidateEmail();
  candidateEmails: CandidateEmail[] | undefined

  @ViewChild("jobForm")
  emailForm!: NgForm;

  constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }

  titles: any[] = [
    {
      "id": 1,
      "name": 'Sourced'
    },
    {
      "id": 2,
      "name": 'Screening'
    },
    {
      "id": 3,
      "name": 'Interview'
    },
    {
      "id": 4,
      "name": 'Preboarding'
    },
    {
      "id": 1,
      "name": 'Hired'
    },
    {
      "id": 1,
      "name": 'Archived'
    },
  ]


  getEmailList() {
    return this.http.get<CandidateEmail[]>(
        'http://localhost:9000/email/all'
    );
}
getAllEmailList() {
    return this.getEmailList().subscribe((data) => {
        console.log(data);
        this.candidateEmails = data;
        this.changeDetectorRefs.markForCheck();
    });
}

  addEmail() {
    this.http.post<CandidateEmail>('http://localhost:9000/email/', this.candidateEmail).subscribe(
      res => {
        console.log(res);
        // this.getAllEmailList();
        // this.emailForm.reset();
        this.router.navigateByUrl('/email');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occurred.");
        } else {
          console.log("Server-side error occurred.");
        }
      }
    );
  }

  ngOnInit() {
    this.getAllEmailList();
  }
  

}
