import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/demo/service/node.service';

interface ExpandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];
  expandedRows: ExpandedRows = {};
  isExpanded = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private changeDetectorRefs: ChangeDetectorRef,
    private nodeService: NodeService
  ) { }

  ngOnInit() {
    this.getAllVendorList();
  }

  getAllVendorList() {
    this.http.get<Vendor[]>('http://localhost:9000/vendor/all')
      .subscribe((data) => {
        this.vendors = data;
      });
  }

  expandAll() {
    if (!this.isExpanded) {
      this.vendors.forEach(vendor => {
        if (vendor && vendor.id) {
          this.expandedRows[vendor.id] = true;
        }
      });
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  navigateToCreateVendor() {
    this.router.navigate(['vendor-cretae'])
}

}