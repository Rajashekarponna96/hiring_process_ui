import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../model/client';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService, ConfirmationService, TreeNode } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { NodeService } from 'src/app/demo/service/node.service';
import { Poc } from '../../model/poc';



interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ClientComponent  implements OnInit {
  editMode!: boolean;
  selectedIndex!: number;

  //

  constructor(private customerService: CustomerService, private productService: ProductService, private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef,private nodeService: NodeService) { }


  clients: Client[] = [];
  client: Client = new Client(); 
  pocs: Poc = new Poc(); // Initialize pointToContact object
  pointToContacts!: Poc[]; // Initialize pointToContacts array
  productDialog: boolean = false;
  submitted: boolean = false;
  

  openNew(client:Client) { debugger
    this.pointToContacts= client.pocs;
    console.log(" dertails for pocs:"+this.pointToContacts)
    this.submitted = false;
    this.productDialog = true;
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}


  handleEditclient(client: Client, clientId: number) {
    this.router.navigate(['editclient'], { state: { clientId: clientId, client: client } });


  }

  clientDelete(client: Client) {

    console.log("candidate is is:" + client.id)
    this.http
      .delete<Client[]>(
        'http://localhost:9000/client/' + client.id
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.getAllClientList();
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

  onGlobalFilter(table: Table, event: Event) {

    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  onGlobalFilter1(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);
    this.http.get<any>('http://localhost:9000/client/searchpage', {
        params: {
            // firstName: inputValue,
            // lastName:inputValue,
            // email: inputValue
            code:inputValue,
            page: 0,
            size: 3
        }
    }).subscribe((data) => {

        this.clients = data["content"]
         this.changeDetectorRefs.markForCheck();
    });

    // this.getAllCandidatesListForGlobalFilter(inputValue);


}





  getClientList() {
    return this.http.get<Client[]>('http://localhost:9000/client/all');
  }

  getAllClientList() {
    return this.getClientList().
      subscribe((data) => {
        console.log(data);
        this.clients = data;
        console.log("candidate list are" + this.clients)
        this.changeDetectorRefs.markForCheck();
      });
  }





  navigateToCreateClient() {
    this.router.navigate(['createclient'])
  }


  //

  customers1: Customer[] = [];

  customers2: Customer[] = [];

  customers3: Customer[] = [];

  selectedCustomers1: Customer[] = [];

  selectedCustomer: Customer = {};

  representatives: Representative[] = [];

  statuses: any[] = [];

  products: Product[] = [];

  rowGroupMetadata: any;

  expandedRows: expandedRows = {};

  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;



  ngOnInit() {
    this.getAllClientList();
    const stateData = history.state || {}; // Retrieve state data
  const client = stateData.client; // Get candidate object from state

  if (client) {
    this.client = client; // Assign candidate object to component property
    this.pointToContacts = this.client.pocs;

  } else {
    console.error('Candidate data is missing in state.');
  }

   
    }




  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.customers3) {
      for (let i = 0; i < this.customers3.length; i++) {
        const rowData = this.customers3[i];
        const representativeName = rowData?.representative?.name || '';

        if (i === 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        }
        else {
          const previousRowData = this.customers3[i - 1];
          const previousRowGroup = previousRowData?.representative?.name;
          if (representativeName === previousRowGroup) {
            this.rowGroupMetadata[representativeName].size++;
          }
          else {
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  expandAll1() {
    if (!this.isExpanded) {
      this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  // expandAll() {
  //   if (!this.isExpanded) {
  //     this.clients.forEach(client => client && client.companyName ? this.expandedRows[client.companyName] = true : '');
  //   } else {
  //     this.expandedRows = {};
  //   }
  //   this.isExpanded = !this.isExpanded;
  // }
  expandAll() {
    if (!this.isExpanded) {
        this.clients.forEach(client => client && client.id ? this.expandedRows[client.id] = true : '');
    } else {
        this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
}




    files3: TreeNode[] = [];

    // selectedFiles1: TreeNode[] = [];

    // selectedFiles2: TreeNode[] = [];

    selectedFiles3: TreeNode = {};

    cols: any[] = [];


goToFirstPage(){};
goToPreviousPage(){};
goToNextPage(){};
goToLastPage(){};
}