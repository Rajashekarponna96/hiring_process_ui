import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/client';
import { PointToContact } from '../../../model/PointToContact';

@Component({
  selector: 'app-createclient',
  templateUrl: './createclient.component.html',
  styleUrls: ['./createclient.component.css']
})
export class CreateclientComponent implements OnInit {
  showPocsFields: boolean = false;
  client: Client = new Client(); // Initialize client object
  pointToContact: PointToContact = new PointToContact(); // Initialize pointToContact object
  pointToContacts: PointToContact[] = []; // Initialize pointToContacts array

  togglePocsFields() {
    this.showPocsFields = !this.showPocsFields;
    if (this.showPocsFields) {
      this.addPocField(); // Call function to add a new POCS field
    }
  }

  addPocField() {
    this.pointToContact = new PointToContact(); // Reset pointToContact object
  }

  // submitPocs() {
  //   // Add the current pointToContact to pointToContacts array
  //   this.pointToContacts.push(this.pointToContact);
  //   // Reset pointToContact object for the next entry
  //   this.pointToContact = new PointToContact();
  // }
  EditPoc(index:number){
    const selectedEducation = this.pointToContacts[index];

      // Set the fields to be edited
      this.pointToContact.name = selectedEducation.name;
      this.pointToContact.mobileNo = selectedEducation.mobileNo;
      this.pointToContact.emailId = selectedEducation.emailId;
      

      // Set edit mode and selected index
      this.editMode = true;
      this.selectedIndex = index;

  }
  deletePoc(i:any){
    this.pointToContacts.splice(i, 1);

  }

  submitPocs(){
    // Validate the experience details before adding or updating in the table
    if (this.validateEducation()) {
        if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
            // Update the existing experience details
            this.pointToContacts[this.selectedIndex] = { ...this.pointToContact };

            // Reset edit mode and selected index
            this.editMode = false;
            this.selectedIndex = null;
        } else {
            // Check if the experience already exists
            const existingIndex = this.pointToContacts.findIndex(edu => edu.name === this.pointToContact.name && edu.mobileNo === this.pointToContact.mobileNo);

            if (existingIndex !== -1) {
                // Update the existing experience details
                this.pointToContacts[existingIndex] = { ...this.pointToContact };
            } else {
                // Add new experience details to the table
                this.pointToContacts.push({ ...this.pointToContact });
            }
        }

        // Clear the form fields after submission
        this.clearEducationFields();
    }
  }
  clearEducationFields() {
    // Clear the form fields
    this.pointToContact = {
              name:"",
              mobileNo:"",
              emailId:"",
              


            };
    // Hide the education fields
    this.showPocsFields = false;
  }


  validateEducation(): boolean {
    // Add your validation logic here
    // Return true if the validation passes, otherwise false
    return true;
  }



  
    

  editMode: boolean = false; // Indicates whether the form is in edit mode

  editedExperienceIndex: number | null = null
  selectedIndex: number | null = null; // Index of the currently selected row for editing



  ngOnInit() {
  }
}