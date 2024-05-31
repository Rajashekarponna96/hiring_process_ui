import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Recruiter } from '../../../model/recruiter';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruiterService } from 'src/app/demo/service/recruiter.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editrecruiter',
  templateUrl: './editrecruiter.component.html',
  styleUrls: ['./editrecruiter.component.scss']
})
export class EditrecruiterComponent implements OnInit {

  @ViewChild("recruiterForm") recruiterForm!: NgForm;

  recruiter = new Recruiter();
  recruiters: Recruiter[] = [];

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private route: ActivatedRoute,
    private recruiterService: RecruiterService
  ) { }

  ngOnInit() {
    const stateData = history.state || {};
    const recruiter = stateData.recruiter;

    if (recruiter) {
      this.recruiter = recruiter;
    } else {
      console.error('Recruiter data is missing in state.');
    }
  }

  getRecruiter(recruiterId: number) {
    this.recruiterService.getRecruiterById(recruiterId).subscribe(
      (recruiter: Recruiter) => {
        this.recruiter = recruiter;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching recruiter details:', error.message);
      }
    );
  }

  updateRecruiter() {
    this.recruiterService.updateRecruiter(this.recruiter).subscribe(
      res => {
        console.log('Recruiter updated successfully:', res);
        this.getAllRecruiters();
        this.recruiterForm.reset();

        this.router.navigateByUrl('/recruiter');
      },
      (err: HttpErrorResponse) => {
        console.error('Error updating recruiter:', err.message);
      }
    );
  }

  getAllRecruiters() {
    this.recruiterService.getRecruiterList().subscribe(
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
