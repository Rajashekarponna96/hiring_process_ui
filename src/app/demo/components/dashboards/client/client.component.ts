import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router: Router,private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef) { }

   
   clients: Client[] = [];


navigateToCreateClient(){
  this.router.navigate(['createclient']) 

}

handleEditclient(client:Client,clientId:number){
  this.router.navigate(['editclient'], { state: { clientId: clientId, client: client } });


}

clientDelete(client:Client){

  console.log("candidate is is:"+client.id)
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
getClientList(){
  return this.http.get<Client[]>('http://localhost:9000/client/all');
}

getAllClientList(){
  return this.getClientList().
  subscribe((data) => {
     console.log(data);
     this.clients=data;
     console.log("candidate list are"+this.clients)
     this.changeDetectorRefs.markForCheck();
  });
} 




  ngOnInit() {
   this. getAllClientList()

  }

}
