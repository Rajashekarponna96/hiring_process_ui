import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/demo/api/customer';
import { Recruiter } from '../../model/recruiter';
import { HttpClient } from '@angular/common/http';
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

  
  ngOnInit() {
    this.getAllRecruiterList();
  }

  navigateToCreateRecruiter(){
    this.router.navigate(['createrecruiter'])
}

}
