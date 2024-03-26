import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router: Router,private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef) { }


   clients: Client[] = [
    {
        name: "Client 1",
        contactPocs: [
          {
            name:"shalini",
            mobileNo:"7989384442",
            emailId:"edara.shalini@gmail.com"
          },
          {
            name:"sravani",
            mobileNo:"7989384443",
            emailId:"edara.sravani@gmail.com"
          }
            
        ],
        location: "Location1"
    },
    {
        name: "Client 2",
        contactPocs: [
          {
            name:"thanuja",
            mobileNo:"7989384444",
            emailId:"edara.thanuja@gmail.com"
          },
          {
            name:"raj",
            mobileNo:"7989384445",
            emailId:"edara.raj@gmail.com"
          }
           
        ],
        location: "Location 2"
    },
    // Add more clients as needed
];


navigateToCreateClient(){
  this.router.navigate(['createclient']) 

}

handleEditcandidate(client:any){

}

candidateDelete(client:any){
  
}

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
  );
}



  ngOnInit() {

  }

}
