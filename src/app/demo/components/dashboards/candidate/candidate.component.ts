import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Candidate } from '../../model/candidate';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-candidate',
    templateUrl: './candidate.component.html',
    styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent  {
    
    constructor(private router: Router,private http:HttpClient,private changeDetectorRefs: ChangeDetectorRef) { }
    candidate:Candidate =new Candidate();
    candidates: Candidate[]=[];

    navigateToCreateCandidate(){
        this.router.navigate(['createrecandidate']) 

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getCandidateList(){
        return this.http.get<Candidate[]>('http://localhost:9000/candidate/all');
    }
    
    getAllCandidateList(){
        return this.getCandidateList().
        subscribe((data) => {
           console.log(data);
           this.candidates=data;
           this.changeDetectorRefs.markForCheck();
        });
      } 
      

    
    

    
    ngOnInit() {
        this.getAllCandidateList();
       
    }

    
  }
    

