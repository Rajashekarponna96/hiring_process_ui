import { Component } from '@angular/core';

@Component({
  selector: 'app-createrecruiter',
  templateUrl: './createrecruiter.component.html',
  styleUrls: ['./createrecruiter.component.scss']
})
export class CreaterecruiterComponent {
  recruiter: any = {};
  isSubmitted: boolean = false;

  onSubmit() {
      // Submit logic here
      console.log('Form submitted successfully');
      console.log(this.recruiter);
  }

  onCancel() {
      // Cancel logic here
      console.log('Cancelled');
  }

}
