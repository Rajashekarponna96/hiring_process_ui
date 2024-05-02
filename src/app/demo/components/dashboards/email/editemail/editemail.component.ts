import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CandidateEmail } from '../../../model/candidateEmail';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editemail',
  templateUrl: './editemail.component.html',
  styleUrls: ['./editemail.component.scss']
})
export class EditemailComponent {

  candidateEmail: CandidateEmail = new CandidateEmail();
  candidateEmails: CandidateEmail[] | undefined

  @ViewChild("jobForm")
  emailForm!: NgForm;

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

  
  constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }
  ngOnInit() {
    const stateData = history.state || {}; 
    const candidateEmail = stateData.candidateEmail;
    if (candidateEmail) {
      this.candidateEmail = candidateEmail;
      
    } else {
      console.error('candidateEmail data is missing in state.');
    }

    this.getAllEmailList();
  }

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

  updateEmail() {
    this.http.put<CandidateEmail>('http://localhost:9000/email/' + this.candidateEmail.id, this.candidateEmail).subscribe(
      res => {
        console.log(res);
        // this.getAllEmailList();
        // this.emailForm.reset();

        // Redirect to the "/jobs" route after successfully updating the job
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


}
