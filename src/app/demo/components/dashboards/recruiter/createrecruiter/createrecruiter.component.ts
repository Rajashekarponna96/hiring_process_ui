import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Recruiter } from '../../../model/recruiter';
import { RecruiterService } from 'src/app/demo/hiring-process-services/recruiter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserAccout } from '../../../model/userAccount';
import { Role } from '../../../model/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createrecruiter',
  templateUrl: './createrecruiter.component.html',
  styleUrls: ['./createrecruiter.component.scss']
})
export class CreaterecruiterComponent {
  recruiter: Recruiter = new Recruiter();
  recruiters: Recruiter[] | undefined;
  @ViewChild("recruiterForm") recruiterForm!: NgForm;

  userAccount = new UserAccout();
  role = new Role();

  constructor(
    private recruiterService: RecruiterService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  getAllRecruiterList() {
    this.recruiterService.getRecruiterList().subscribe(
      (data) => {
        console.log(data);
        this.recruiters = data;
        this.changeDetectorRefs.markForCheck();
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

  addRecruiter() {
    // Uncomment and set user account and role details if necessary
    // let email = this.recruiter.email;
    // let mobile = this.recruiter.mobile;
    // this.userAccount.userName = email;
    // this.userAccount.password = mobile;
    // this.role.name = 'Admin';
    // this.role.description = 'This is for Admin';
    // this.userAccount.role = this.role;
    // this.recruiter.userAccout = this.userAccount;

    this.recruiterService.addRecruiter(this.recruiter).subscribe(
      res => {
        console.log(res);
        this.getAllRecruiterList();
        this.recruiterForm.reset();

        // Redirect to the "/recruiter" route after successfully adding a new recruiter
        this.router.navigateByUrl('/recruiter');
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
    this.getAllRecruiterList();
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}

