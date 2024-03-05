import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recruiter } from '../../model/recruiter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent {



  recruiter: Recruiter = new Recruiter();
  recrutiers:Recruiter[] =[];

  constructor(private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef,private router: Router) { }


  getRecruiterList(){
    return this.http.get<Recruiter[]>('http://localhost:9000/recruiter/all');

  }
  getAllRecruiterList(){
    return this.getRecruiterList().
    subscribe((data) => {
       console.log(data);
       this.recrutiers=data;
       this.changeDetectorRefs.markForCheck();
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
}

handleEditRecruiter(recruiter:Recruiter){
  console.log(recruiter.id)
  localStorage.setItem("id",String(recruiter.id))
  console.log(recruiter);
  localStorage.setItem('editRecruiter', JSON.stringify(recruiter));
  this.router.navigate(['editrecruiter'])
  
}



recruiterdelete(recruiter: Recruiter) {
    return  this.http.delete<Recruiter>('http://localhost:9000/recruiter/'+ recruiter.id).subscribe(
        res => {
          console.log(res);
          this.getAllRecruiterList();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
}



  ngOnInit() {
    this.getAllRecruiterList();
  }

  navigateToCreateRecruiter(){
    this.router.navigate(['createrecruiter'])
}

}
