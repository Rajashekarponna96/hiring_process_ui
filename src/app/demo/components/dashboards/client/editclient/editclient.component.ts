import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../../../model/client';
import { Poc } from '../../../model/poc';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.scss']
})
export class EditclientComponent {

  @ViewChild("editClientForm")
  editClientForm!: NgForm
  
  constructor(private router: Router,private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef) { }

  showPocsFields: boolean = false;
  client: Client = new Client(); // Initialize client object
  pointToContact: Poc= new Poc(); // Initialize pointToContact object
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
      this.pointToContact.mobile = selectedEducation.mobile;
      this.pointToContact.email = selectedEducation.email;
      

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
            const existingIndex = this.pointToContacts.findIndex(edu => edu.name === this.pointToContact.name && edu.mobile === this.pointToContact.mobile);

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
              mobile:"",
              email:"",
              


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

  updateclient(){
    this.client.pocs = this.pointToContacts
    console.log("client details are:"+this.client.pocs.length)

    this.http.put<Client>('http://localhost:9000/client/'+this.client.id, this.client).subscribe(
      res => {
        console.log(res);
      })

  }



  ngOnInit() {

    const stateData = history.state || {}; // Retrieve state data
    const client = stateData.client; // Get candidate object from state

    if (client) {
      this.client = client; // Assign candidate object to component property
      this.pointToContacts = this.client.pocs;
      
    } else {
      console.error('Candidate data is missing in state.');
    }


    
  }



  }


  
  



