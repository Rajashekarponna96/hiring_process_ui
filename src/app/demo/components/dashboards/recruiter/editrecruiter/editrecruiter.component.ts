import { Component, OnInit } from '@angular/core';
import { Recruiter } from '../../../model/recruiter';

@Component({
  selector: 'app-editrecruiter',
  templateUrl: './editrecruiter.component.html',
  styleUrls: ['./editrecruiter.component.scss']
})
export class EditrecruiterComponent implements OnInit{

  recruiter = new Recruiter();
  recrutiers: Recruiter[] = [];

  constructor(){
    
  }
  ngOnInit() {
    //this.recruiter = JSON.parse(localStorage.getItem('editRecruiter'))
  }
  
}
