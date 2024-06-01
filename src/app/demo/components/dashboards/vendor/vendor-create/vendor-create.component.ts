import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../../../model/vendor';
import { VendorService } from 'src/app/demo/hiring-process-services/vendor.service';
@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  constructor(
    private router: Router,
    private vendorService: VendorService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  showPocsFields: boolean = false;
  vendor: Vendor = new Vendor();

  addVendor() {
    this.vendorService.addVendor(this.vendor).subscribe(
      res => {
        console.log('Vendor added successfully:', res);
        this.router.navigate(['/vendor-list']);
      },
      error => {
        console.error('Error occurred while adding vendor:', error);
      }
    );
  }

  ngOnInit() {
  }
}


