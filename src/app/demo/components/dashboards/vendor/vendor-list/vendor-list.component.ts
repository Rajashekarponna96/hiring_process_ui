import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/demo/service/node.service';
import { Pagination } from '../../../model/pagination';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;

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
    this.http.get<any>('http://localhost:9000/vendor/vendorlistwithpagination', {

      params: {
        page: this.currentPage.toString(),
        size: this.selectedRecordsOption1.toString()
      }
    }).subscribe((data) => {
      this.vendors = data.content;
      this.pagination = data;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.changeDetectorRefs.markForCheck();
    });
  }

  navigateToCreateVendor() {
    this.router.navigate(['vendor-create']);
  }

  handleEditVendor(vendor: Vendor, vendorId: number) {
    this.router.navigate(['vendor-edit'], { state: { vendorId: vendorId, vendor: vendor } });
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

  goToFirstPage() {
    this.currentPage = 0;
    this.getAllVendorList();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllVendorList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllVendorList();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllVendorList();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0; // Reset to first page when changing page size
    this.getAllVendorList();
  }

  // onGlobalFilter1(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const inputValue = inputElement.value;
  //   console.log('Input Value:', inputValue);
  //   this.http.get<any>('http://localhost:9000/vendor/searchpage', {
  //       params: {
  //           // firstName: inputValue,
  //           // lastName:inputValue,
  //           // email: inputValue
  //           code:inputValue,
  //           page:this.currentPage.toString(),
  //           size: this.selectedRecordsOption1
  
  //       }
  //   }).subscribe((data) => {
       
  //       this.vendors = data["content"]
        
  //        this.changeDetectorRefs.markForCheck();
  //   });
  
  // }


  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);
    this.http.get<any>('http://localhost:9000/vendor/searchpage', {
      params: {
        code: inputValue,
        page: '0', // Reset to first page when applying filter
        size: this.selectedRecordsOption1.toString()
      }
    }).subscribe((data) => {
      this.vendors = data["content"];
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.currentPage = 0; // Reset to first page
      this.changeDetectorRefs.markForCheck();
    });
  }
}