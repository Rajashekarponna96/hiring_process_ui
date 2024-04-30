import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Candidate } from '../../model/candidate';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-candidate',
    templateUrl: './candidate.component.html',
    styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent {
    @ViewChild('dt')
    dataTable!: Table;
    submitted: boolean = false;
    productDialog: boolean = false;
    fetchedCandidateStage!: string;
    
    
    constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) {
            
     }


    candidate: Candidate = new Candidate();
    selectededCandidate!: Candidate;
    candidates: Candidate[] = [];
    filteredCandidates: Candidate[] = [];
    displayFilterFields = false;

    navigateToCreateCandidate() {
        this.router.navigate(['menus'])

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    // onGlobalFilter1(event: Event){
    //     return this.http.get<Candidate[]>('http://localhost:9000/candidate/candidates');

    // }
    // getAllCandidatesListForGlobelFilter(){
    //     return this.getCandidateList().
    //         subscribe((data) => {
    //             console.log(data);
    //             this.candidates = data;
    //             console.log("candidate list are" + this.candidates)
    //             this.changeDetectorRefs.markForCheck();
    //         });

    // }

    // getAllCandidatesListForGlobalFilter(inputValue: any) {
    //     this.http.get<Candidate[]>('http://localhost:9000/candidate/candidates?firstName=this.inputValue&lastName=this.inputValue&email=this.inputValue')
    //         .subscribe((data) => {
    //             console.log(data);
    //             this.candidates = data;
    //             this.filteredCandidates = data; // Initialize filteredCandidates with all candidates
    //         });
    // }

    getAllCandidatesListForGlobalFilter(inputValue: any) {
        this.http.get<Candidate[]>('http://localhost:9000/candidate/candidates?firstName=this.inputValue&lastName=this.inputValue&email=this.inputValue')
            .subscribe((data) => {
                console.log(data);
                this.candidates = data;
                this.filteredCandidates = data; // Initialize filteredCandidates with all candidates
            });
    }

    onGlobalFilter1(event: any) {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;
        console.log('Input Value:', inputValue);
        this.http.get<any>('http://localhost:9000/candidate/searchpage', {
            params: {
                // firstName: inputValue,
                // lastName:inputValue,
                // email: inputValue
                code:inputValue,
                page: 0,
                size: 3
            }
        }).subscribe((data) => {
           
            this.candidates = data["content"]
             this.changeDetectorRefs.markForCheck();
        });

        // this.getAllCandidatesListForGlobalFilter(inputValue);

        
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


    handleEditcandidate(candidateId: number, candidate: Candidate) { 

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

    menuitems: MenuItem[] = [];
    
    stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];
    showStages: boolean = false;
  
    toggleStages() {
      this.showStages = !this.showStages;
    }
    openNew(candidate:Candidate) {
        console.log("candidate dertails for stage:"+candidate.email)
       this.candidate.stage = candidate.stage
       this.selectededCandidate =candidate
        this.submitted = false;
        this.productDialog = true;
    }


    toggleFilter() {
        this.displayFilterFields = !this.displayFilterFields;
        if (!this.displayFilterFields) {
          // Reset filtering
          this.dataTable.reset();
        }
      }

      hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }


    updateCandidate(candidate:Candidate,stage:string) {debugger
        
       candidate.stage  = stage;
        
        
        this.http.put<Candidate>('http://localhost:9000/candidate/' + candidate.id, candidate).subscribe(
          res => {
            console.log(res);
            this.productDialog = false;
            this.submitted = false; 
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occurred:", err.error.message);
            } else {
              console.log("Server-side error occurred:", err.status, err.message);
            }
          }
        );
      }


    ngOnInit() {
        this.getAllCandidateList();

    }


}


