import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../model/client';
import { Poc } from '../../model/poc';
import { Pagination } from '../../model/pagination';
import { ClientService } from 'src/app/demo/service/client.service';

interface ExpandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  client: Client = new Client();
  pocs: Poc[] = [];
  productDialog: boolean = false;
  submitted: boolean = false;
  expandedRows: ExpandedRows = {};
  isExpanded: boolean = false;
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;

  // clients: Client[] = [];
  // client: Client = new Client();
  //pocs: Poc = new Poc(); // Initialize pointToContact object
  pointToContacts!: Poc[]; // Initialize pointToContacts array

  //productDialog: boolean = false;
  //submitted: boolean = false;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllClientListWithPagination();
  }


  openNew(client: Client) {
    this.pointToContacts = client.pocs;
    console.log(" dertails for pocs:" + this.pointToContacts)
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  handleEditClient(client: Client, clientId: number) {
    this.router.navigate(['editclient'], { state: { clientId: clientId, client: client } });
  }

  clientDelete(client: Client) {
    console.log("client id is:", client.id);
    this.clientService.deleteClient(client.id).subscribe(
      (res) => {
        console.log('Client deleted successfully.');
        this.getAllClientList();
      },
      (err) => {
        console.error('Error occurred while deleting client:', err);
      }
    );
  }
  navigateToCreateClient() {
    this.router.navigate(['createclient'])
  }
  onGlobalFilter1(event: any) {
    const inputValue = event.target.value;
    this.clientService.searchClientByCode(inputValue, this.currentPage, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.clients = data.content;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getAllClientList() {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllClientListWithPagination() {
    this.clientService.getClientListWithPagination(this.currentPage, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.clients = data.content;
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getAllClientListWithPagination();
  }
  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllClientListWithPagination();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllClientListWithPagination();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllClientListWithPagination();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.getAllClientListWithPagination();
  }

  // Methods for pagination navigation and records per page change...
}

