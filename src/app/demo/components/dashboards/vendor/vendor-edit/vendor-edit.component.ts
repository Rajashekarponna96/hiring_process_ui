// vendor-edit.component.ts

import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vendor } from '../../../model/vendor';
import { Poc } from '../../../model/poc';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent {

  @ViewChild("editVendorForm")
  editVendorForm!: NgForm;

  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }

  showPocsFields: boolean = false;
  vendor: Vendor = new Vendor(); // Initialize vendor object
  editedPocIndex: number | null = null; // Index of the edited POC
  editedPoc: Poc = new Poc(); // Initialize edited POC object
  vendorPocs: Poc[] = []; // Initialize vendor POCs array

  togglePocsFields() {
    this.showPocsFields = !this.showPocsFields;
    if (this.showPocsFields) {
      this.addPocField(); // Call function to add a new point of contact field
    }
  }

  addPocField() {
    this.editedPoc = new Poc(); // Reset edited POC object
  }

  editPoc(index: number) {
    this.editedPocIndex = index;
    this.editedPoc = { ...this.vendorPocs[index] };
  }

  deletePoc(index: number) {
    this.vendorPocs.splice(index, 1);
  }

  submitPocs() {
    if (this.validatePoc()) {
      if (this.editedPocIndex !== null) {
        this.vendorPocs[this.editedPocIndex] = { ...this.editedPoc }; // Update existing POC
        this.editedPocIndex = null;
      } else {
        this.vendorPocs.push({ ...this.editedPoc }); // Add new POC
      }
      this.clearPocFields();
    }
  }

  clearPocFields() {
    this.editedPoc = {
      name: "",
      mobile: "",
      email: ""
    };
    this.showPocsFields = false;
  }

  validatePoc(): boolean {
    if (!this.editedPoc.name || !this.editedPoc.email || !this.editedPoc.mobile) {
      throw new Error('All fields are required');
    }
    return true;
  }

  updateVendor() {
    this.vendor.pocs = this.vendorPocs;
    this.http.put<Vendor>('http://localhost:9000/vendor/' + this.vendor.id, this.vendor).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/vendor-list']);
      },
      error => {
        console.error('Error occurred while updating vendor:', error);
      }
    );
  }

  ngOnInit() {
    const stateData = history.state || {};
    const vendor = stateData.vendor;

    if (vendor) {
      this.vendor = vendor;
      this.vendorPocs = this.vendor.pocs;
    } else {
      console.error('Vendor data is missing in state.');
    }
  }
}

