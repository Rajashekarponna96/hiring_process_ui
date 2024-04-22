
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor'; // Import Vendor model
import { VendorPoc } from '../../../model/vendorPoc'; // Import VendorPoc model
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAccout } from '../../../model/userAccount';
import { Role } from '../../../model/role';


@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }

  showPocsFields: boolean = false;
  vendor: Vendor = new Vendor(); // Initialize vendor object
  
  userAccount = new UserAccout();
  role = new Role();

  addVendor() {

    let email = this.vendor.email;
    let mobile = this.vendor.mobile;
    this.userAccount.userName = email;
    this.userAccount.password = mobile;
    this.role.name = 'Admin';
    this.role.description = 'This is for Admin';
    this.userAccount.role = this.role;
    this.vendor.userAccout = this.userAccount;

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
  



 

  

  ngOnInit() {
  }
}
