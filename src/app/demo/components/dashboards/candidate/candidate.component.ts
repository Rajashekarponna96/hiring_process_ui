import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Candidate } from '../../model/candidate';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-candidate',
    templateUrl: './candidate.component.html',
    styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {

    constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }
    candidate: Candidate = new Candidate();
    candidates: Candidate[] = [];

    navigateToCreateCandidate() {
        this.router.navigate(['menus'])

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getCandidateList() {
        return this.http.get<Candidate[]>('http://localhost:9000/candidate/all');
    }

    getAllCandidateList() {
        return this.getCandidateList().
            subscribe((data) => {
                console.log(data);
                this.candidates = data;
                console.log("candidate list are" + this.candidates)
                this.changeDetectorRefs.markForCheck();
            });
    }


    handleEditcandidate(candidateId: number, candidate: Candidate) { debugger

        console.log("Candidate ID:", candidateId);
        console.log("Candidate object:", candidate);
        // Instead of using local storage, navigate to the 'editcandidate' route with the candidate object as a parameter in the state
        this.router.navigate(['editcandidate'], { state: { candidateId: candidateId, candidate: candidate } });
    }

    candidateDelete(candidate: Candidate) {

        console.log("candidate is is:" + candidate.id)
        this.http
            .delete<Candidate[]>(
                'http://localhost:9000/candidate/' + candidate.id
            )
            .subscribe(
                (res) => {
                    console.log(res);
                    this.getAllCandidateList();
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






    ngOnInit() {
        this.getAllCandidateList();

    }


}


