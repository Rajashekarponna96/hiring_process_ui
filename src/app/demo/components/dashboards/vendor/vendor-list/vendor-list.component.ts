import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/demo/service/node.service';
import { Table } from 'primeng/table';
import { Pagination } from '../../../model/pagination';

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
  selectedRecordsOption1:any=5
  // pagination!: Pagination;

  // totalPages:any;
  // totalElements:any;
  size:any
  page:any = 0


  pagination!: Pagination; 
  totalElements: number = 0; // Total number of elements
  totalPages: number = 0; // Total number of pages
  currentPage:number = 1;


  


  constructor(
    private router: Router,
    private http: HttpClient,
    private changeDetectorRefs: ChangeDetectorRef,
    private nodeService: NodeService
  ) { }

  ngOnInit() {
    this.getAllVendorList();
    this.selectedRecordsOption1 = 5
  }

  // getAllVendorList() {
  //   this.http.get<Vendor[]>('http://localhost:9000/vendor/all')
  //     .subscribe((data) => {
  //       this.vendors = data;
  //     });
  // }

  // getAllVendorList() {
  //   this.http.get<any>('http://localhost:9000/vendor/vendorlistwithpagination', {
  //     params: {
  //         page: 0,
  //         size: this.selectedRecordsOption1

  //     }
  // }).subscribe((data) => {
     
  //     this.vendors = data["content"]
  //     this.pagination =data['pageable']
  //     console.log("total enties are "+this.pagination.totalPages)
  //      this.totalPages=data.totalPages;
  //       this.totalElements = data.totalElements
  //     this.size =data.size;
  //     console.log("totalnumber of elements,total pages ,page sizes are "+this.totalPages+this.totalElements+this.size)
      

  //     this.pagination= data.pageable;
  //       console.log("pagination details are:"+this.pagination); // Optional: Log the pageable details to the console



  //      this.changeDetectorRefs.markForCheck();
  // });
  // }

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

// onRecordsPerPageChange(event: Event) {
//   const selectedRecordsOption = (event.target as HTMLSelectElement).value;
//   this.selectedRecordsOption1 = selectedRecordsOption;
//   console.log("selected records are :"+this.selectedRecordsOption1)
//  this.getAllVendorList()
//   // Now you can use selectedRecordsOption in your logic or pass it to onGlobalFilter1() method
//   // this.onGlobalFilter1();
// }

prevousPage(){
  this.getAllVendorList()

}

// nextPage(){
//   this.getAllVendorList()
// }

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
          size: this.selectedRecordsOption1

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




  getAllVendorList() {
    this.http.get<any>('http://localhost:9000/vendor/vendorlistwithpagination', {
      params: {
        // page: this.pagination.first ? 0 : (this.pagination.last ? this.totalPages - 1 : 0), // Adjust page number based on first and last flags
        // size: this.selectedRecordsOption1.toString()
        page:this.page,
      size: this.selectedRecordsOption1
      }
    }).subscribe((data) => {
      this.vendors = data["content"];
      this.pagination = data['pageable'];
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.changeDetectorRefs.markForCheck();
    });
  }

  prevPage() {debugger
   
      if(this.totalPages>=this.currentPage){
      this.pagination.first = true;
      this.pagination.last = false;
      
      this.page= this.currentPage-1;
      this.page =this.page-1;
      
      
      this.getAllVendorList();
      }
    
  }

  nextPage() {
    if (!this.pagination.first) {
      if(this.totalPages>this.currentPage){
        this.pagination.first = false;
      this.pagination.last = true;
      this.page=this.currentPage++
      this.getAllVendorList();
      }
      
    
    }
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.pagination.first = true;
    this.pagination.last = false;
    this.getAllVendorList();
  }
}

