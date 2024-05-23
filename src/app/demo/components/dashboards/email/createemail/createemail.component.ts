import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CandidateEmail } from '../../../model/candidateEmail';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-createemail',
  templateUrl: './createemail.component.html',
  styleUrls: ['./createemail.component.scss']
})
export class CreateemailComponent {

  candidateEmail: CandidateEmail = new CandidateEmail();
  candidateEmails: CandidateEmail[] | undefined

  //candidateEmail: any; // Assuming candidateEmail is defined elsewhere
  titless!: any[]; // Assuming titles is defined elsewhere
  emailData!: CandidateEmail;

  @ViewChild("jobForm")
  emailForm!: NgForm;
  title!: string;
  
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
      "id": 5,
      "name": 'Hired'
    },
    {
      "id": 6,
      "name": 'Archived'
    },
    {
      "id": 7,
      "name": 'Reject'
    },
    {
      "id": 8,
      "name": 'Hold'
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

getEmailDataByTitle(): void {
  if (this.candidateEmail.title) {
    this.http.get<any>(`http://localhost:9000/email/byTitle?title=${this.candidateEmail.title}`)
      .subscribe(data => {
        this.candidateEmail.subject = data.subject;
        this.candidateEmail.body = data.body;
      }, error => {
        console.error('Error fetching email data:', error);
      });
  }
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
    this.getEmailDataByTitle(); 
  }
  

}
