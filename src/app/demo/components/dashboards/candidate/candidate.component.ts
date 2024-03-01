import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Candidate } from '../../model/candidate';

@Component({
    selector: 'app-candidate',
    templateUrl: './candidate.component.html',
    styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent  {
    
    constructor(private router: Router) { }
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

    
    

    
    ngOnInit() {
       
    }

    
  }
    

