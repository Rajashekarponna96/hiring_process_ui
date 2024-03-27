import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Client } from '../../../model/client';
import { PointToContact } from '../../../model/PointToContact';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Poc } from '../../../model/poc';

@Component({
  selector: 'app-createclient',
  templateUrl: './createclient.component.html',
  styleUrls: ['./createclient.component.css']
})
export class CreateclientComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }


  showPocsFields: boolean = false;
  client: Client = new Client(); // Initialize client object
  pointToContact: Poc = new Poc(); // Initialize pointToContact object
  pointToContacts: Poc[] = []; // Initialize pointToContacts array

  togglePocsFields() {
    this.showPocsFields = !this.showPocsFields;
    if (this.showPocsFields) {
      this.addPocField(); // Call function to add a new POCS field
    }
  }

  addPocField() {
    this.pointToContact = new Poc(); // Reset pointToContact object
  }

  
  EditPoc(index: number) {
    const selectedPoc = this.pointToContacts[index];

    // Set the fields to be edited
    this.pointToContact.name =  selectedPoc.name;
    this.pointToContact.mobile =  selectedPoc.mobile;
    this.pointToContact.email =  selectedPoc.email;


    // Set edit mode and selected index
    this.editMode = true;
    this.selectedIndex = index;

  }
  deletePoc(i: any) {
    this.pointToContacts.splice(i, 1);

  }

  submitPocs() {
    // Validate the experience details before adding or updating in the table
    if (this.validatePoc()) {
      if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
        // Update the existing poc details
        this.pointToContacts[this.selectedIndex] = { ...this.pointToContact };

        // Reset edit mode and selected index
        this.editMode = false;
        this.selectedIndex = null;
      } else {
        // Check if the experience already exists
        const existingIndex = this.pointToContacts.findIndex(edu => edu.name === this.pointToContact.name && edu.mobile === this.pointToContact.mobile);

        if (existingIndex !== -1) {
          // Update the existing poc details
          this.pointToContacts[existingIndex] = { ...this.pointToContact };
        } else {
          // Add new poc details to the table
          this.pointToContacts.push({ ...this.pointToContact });
        }
      }

      // Clear the form fields after submission
      this.clearPocFields();
    }
  }
  clearPocFields() {
    // Clear the form fields
    this.pointToContact = {

      name: "",
      mobile: "",
      email: "",



    };
    // Hide the education fields
    this.showPocsFields = false;
  }


  validatePoc(): boolean {
    if(!this.pointToContact.name||!this.pointToContact.email|| !this.pointToContact.mobile){
      throw new Error(' All fields are  required')
    }

    // Add your validation logic here
    // Return true if the validation passes, otherwise false
    return true;
  }
  editMode: boolean = false; // Indicates whether the form is in edit mode

  editedPocIndex: number | null = null
  selectedIndex: number | null = null; // Index of the currently selected row for editing


  addClient() {
    this.client.pocs = this.pointToContacts;
    console.log("client details are:" + this.client.pocs.length);

    this.http.post<Client>('http://localhost:9000/client/', this.client).subscribe(
      res => {
        console.log(res);
        // Navigate to the client page after adding
        this.router.navigate(['/client']);
      },
      error => {
        console.error('Error occurred while adding client:', error);
      }
    );
  }



  ngOnInit() {
  }
}