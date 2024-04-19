
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor'; // Import Vendor model
import { VendorPoc } from '../../../model/vendorPoc'; // Import VendorPoc model
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }

  showPocsFields: boolean = false;
  vendor: Vendor = new Vendor(); // Initialize vendor object
  vendorPoc: VendorPoc = new VendorPoc(); // Initialize vendorPoc object
  vendorPocs: VendorPoc[] = []; // Initialize vendorPocs array

  togglePocsFields() {
    this.showPocsFields = !this.showPocsFields;
    if (this.showPocsFields) {
      this.addPocField(); // Call function to add a new POC field
    }
  }
  addVendor() {
    // Assign the POCs to the vendor
    this.vendor.pocs = this.vendorPocs;

    // Post the vendor data to the server
    this.http.post<Vendor>('http://localhost:9000/vendor/', this.vendor).subscribe(
      res => {
        console.log(res);
        // Navigate to the vendor page after adding
        this.router.navigate(['/vendor-list']);
      },
      error => {
        console.error('Error occurred while adding vendor:', error);
      }
    );
  }
  addPocField() {
    this.vendorPoc = new VendorPoc(); // Reset vendorPoc object
  }

  deletePoc(i: any) {
    this.vendorPocs.splice(i, 1);
  }

  submitPocs() {
    // Validate the POC details before adding or updating in the table
    if (this.validatePoc()) {
      // Check if the form is in edit mode
      if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
        // Update the existing POC details
        this.vendorPocs[this.selectedIndex] = { ...this.vendorPoc };

        // Reset edit mode and selected index
        this.editMode = false;
        this.selectedIndex = null;
      } else {
        // Check if the POC already exists
        const existingIndex = this.vendorPocs.findIndex(poc => poc.name === this.vendorPoc.name && poc.mobile === this.vendorPoc.mobile);

        if (existingIndex !== -1) {
          // Update the existing POC details
          this.vendorPocs[existingIndex] = { ...this.vendorPoc };
        } else {
          // Add new POC details to the table
          this.vendorPocs.push({ ...this.vendorPoc });
        }
      }

      // Clear the form fields after submission
      this.clearPocFields();
    }
  }

  clearPocFields() {
    // Clear the form fields
    this.vendorPoc = {
      name: "",
      mobile: "",
      email: ""
    };

    // Hide the POC fields
    this.showPocsFields = false;
  }

  validatePoc(): boolean {
    // Validate that all fields are filled
    if (!this.vendorPoc.name || !this.vendorPoc.email || !this.vendorPoc.mobile) {
      throw new Error('All fields are required');
    }
    return true;
  }

  editMode: boolean = false; // Indicates whether the form is in edit mode
  selectedIndex: number | null = null; // Index of the currently selected row for editing

  EditPoc(index: number) {
    const selectedPoc = this.vendorPocs[index];

    // Set the fields to be edited
    this.vendorPoc.name = selectedPoc.name;
    this.vendorPoc.mobile = selectedPoc.mobile;
    this.vendorPoc.email = selectedPoc.email;

    // Set edit mode and selected index
    this.editMode = true;
    this.selectedIndex = index;
  }

  ngOnInit() {
  }
}
