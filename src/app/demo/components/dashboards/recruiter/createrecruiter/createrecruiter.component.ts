import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Recruiter } from '../../../model/recruiter';
import { RecruiterService } from 'src/app/demo/service/recruiter.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subscriber } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createrecruiter',
  templateUrl: './createrecruiter.component.html',
  styleUrls: ['./createrecruiter.component.scss']
})
export class CreaterecruiterComponent {

  recruiter: Recruiter = new Recruiter();
  recrutiers: Recruiter[] | undefined
  @ViewChild("recruiterForm")
  recruiterForm!: NgForm;


  constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) {

  }
  getRecruiterList() {
    return this.http.get<Recruiter[]>('http://localhost:9000/recruiter/all');

  }
  getAllRecruiterList() {
    return this.getRecruiterList().
      subscribe((data) => {
        console.log(data);
        this.recrutiers = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  addRecruiter() {
    debugger
    this.http.post<Recruiter>('http://localhost:9000/recruiter/', this.recruiter).subscribe(
      res => {
        console.log(res);
        this.getAllRecruiterList();
        this.recruiterForm.reset();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        //this.service.typeWarning();

      });
    console.log(JSON.stringify(this.recruiter));
    this.getAllRecruiterList();

  }

  ngOnInit() {
    this.getAllRecruiterList();
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }


}


