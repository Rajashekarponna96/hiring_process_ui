import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Recruiter } from '../../../model/recruiter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editrecruiter',
  templateUrl: './editrecruiter.component.html',
  styleUrls: ['./editrecruiter.component.scss']
})
export class EditrecruiterComponent implements OnInit{

  @ViewChild("recruiterForm")
  recruiterForm!: NgForm;

  recruiter = new Recruiter();
  recrutiers: Recruiter[] = [];

  constructor(private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef){

  }
  getRecruiterList(){
    return this.http.get<Recruiter[]>('http://localhost:9000/recruiter/all');

  }
  getAllRecruiterList(){
    return this.getRecruiterList().
    subscribe((data) => {
       console.log(data);
       this.recrutiers=data;
       this.changeDetectorRefs.markForCheck();
    });
  }
  ngOnInit() {
    this.getAllRecruiterList();
    this.recruiter = JSON.parse(localStorage.getItem('editRecruiter') || '{}')
  }

  updateRecruiter() {
    this.http.put<Recruiter>('http://localhost:9000/recruiter/'+this.recruiter.id, this.recruiter).subscribe(
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

      });


  console.log(JSON.stringify(this.recruiter));
}
}
