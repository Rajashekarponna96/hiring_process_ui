import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vendor } from '../../../model/vendor';
import { Poc } from '../../../model/poc';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { VendorService } from 'src/app/demo/service/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent {

  @ViewChild("editVendorForm")
  editVendorForm!: NgForm;

  constructor(
    private router: Router,
    private vendorService: VendorService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  showPocsFields: boolean = false;
  vendor: Vendor = new Vendor();
  editedPocIndex: number | null = null;
  editedPoc: Poc = new Poc();
  vendorPocs: Poc[] = [];

  // Other methods...

  updateVendor() {
    this.vendorService.updateVendor(this.vendor).subscribe(
      res => {
        console.log('Vendor updated successfully:', res);
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
    } else {
      console.error('Vendor data is missing in state.');
    }
  }
}