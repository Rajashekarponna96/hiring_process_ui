import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CandidateEmail } from '../../../model/candidateEmail';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { EmailtemplateService } from 'src/app/demo/service/emailtemplateervice.service';
@Component({
  selector: 'app-createemail',
  templateUrl: './createemail.component.html',
  styleUrls: ['./createemail.component.scss']
})
export class CreateemailComponent {

  candidateEmail: CandidateEmail = new CandidateEmail();
  candidateEmails: CandidateEmail[] | undefined
  titless!: any[]; // Assuming titles is defined elsewhere
  emailData!: CandidateEmail;

  @ViewChild("jobForm")
  emailForm!: NgForm;
  title!: string;

  constructor(
    private http: HttpClient,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private emailService: EmailtemplateService // Inject the EmailtemplateService
  ) { }

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

  // titles: any[] = [ // Assuming titles is defined elsewhere
  //   {
  //     "id": 1,
  //     "name": 'Sourced'
  //   },
  //   // Other titles...
  // ];

  getAllEmailList() {
    this.emailService.getEmailList()
      .subscribe((data) => {
        console.log(data);
        this.candidateEmails = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getEmailDataByTitle(): void {
    if (this.candidateEmail.title) {
      this.emailService.getEmailDataByTitle(this.candidateEmail.title)
        .subscribe(data => {
          this.candidateEmail.subject = data.subject;
          this.candidateEmail.body = data.body;
        }, error => {
          console.error('Error fetching email data:', error);
        });
    }
  }


  addEmail() {
    this.emailService.addEmail(this.candidateEmail).subscribe(
      res => {
        console.log(res);
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

