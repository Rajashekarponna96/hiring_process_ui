import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/demo/service/node.service';
import { Table } from 'primeng/table';

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
    this.router.navigate(['vendor-create']);
  }
  navigateToCreateVendor1() {
    this.router.navigate(['vendor-create']);
  }

  handleEditVendor(vendor: Vendor, vendorId: number) {
    this.router.navigate(['vendor-edit'], { state: { vendorId: vendorId, vendor: vendor } });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
}

onGlobalFilter1(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;
  console.log('Input Value:', inputValue);
  this.http.get<any>('http://localhost:9000/vendor/searchpage', {
      params: {
          // firstName: inputValue,
          // lastName:inputValue,
          // email: inputValue
          code:inputValue,
          page: 0,
          size: 3

      }
  }).subscribe((data) => {

      this.vendors = data["content"]
       this.changeDetectorRefs.markForCheck();
  });

}


  vendorDelete(vendor: Vendor) {
    console.log("vendor id is:" + vendor.id);
    this.http.delete<Vendor[]>('http://localhost:9000/vendor/' + vendor.id)
      .subscribe(
        (res) => {
          console.log(res);
          this.getAllVendorList();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occurred.');
          } else {
            console.log('Server-side error occurred.');
          }
        }
      );
  }

  goToFirstPage(){}
  goToPreviousPage(){}
  goToNextPage(){}
  goToLastPage(){}
}

