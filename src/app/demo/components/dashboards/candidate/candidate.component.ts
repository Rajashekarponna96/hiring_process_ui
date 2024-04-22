import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class CandidateComponent implements OnInit {

    constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }

    candidates: Candidate[] = [];
    items: MenuItem[] = [];

    navigateToCreateCandidate() {
        this.router.navigate(['menus']);
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
        return this.getCandidateList().subscribe((data) => {
            this.candidates = data;
            this.changeDetectorRefs.markForCheck();
            // After fetching candidates, create context menu items
            this.createContextMenuItems();
        });
    }

    // handleEditcandidate(candidateId: number, candidate: Candidate) {
    //     console.log("Candidate ID:", candidateId);
    //     console.log("Candidate object:", candidate);
    //     this.router.navigate(['editcandidate'], { state: { candidateId: candidateId, candidate: candidate } });
    // }
    handleEditcandidate(candidateId: number | undefined, candidate: Candidate) {
        if (candidateId !== undefined) {
            console.log("Candidate ID:", candidateId);
            console.log("Candidate object:", candidate);
            this.router.navigate(['editcandidate'], { state: { candidateId: candidateId, candidate: candidate } });
        } else {
            console.error("Candidate ID is undefined.");
        }
    }


    candidateDelete(candidate: Candidate) {
        console.log("Candidate ID:", candidate.id);
        console.log("Candidate object:", candidate);
        this.http.delete<Candidate[]>('http://localhost:9000/candidate/' + candidate.id)
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

    loading = [false, false, false, false];

    ngOnInit() {
        this.getAllCandidateList();
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }

    private createContextMenuItems() {
        this.items = this.candidates.map(candidate => ({
            label: candidate.firstName, // Assuming you want to display the candidate's name as the label
            icon: 'pi pi-user', // You can change the icon as needed
            command: () => {
                this.handleEditcandidate(candidate.id, candidate);
            }
        }));
    }
}


// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Table } from 'primeng/table';
// import { Candidate } from '../../model/candidate';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { MenuItem } from 'primeng/api';
// import { Subscription } from 'rxjs';
// @Component({
//     selector: 'app-candidate',
//     templateUrl: './candidate.component.html',
//     styleUrls: ['./candidate.component.scss'],
// })
// export class CandidateComponent implements OnInit {

//     constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }

//     candidates: Candidate[] = [];

//     navigateToCreateCandidate() {
//         this.router.navigate(['menus']);
//     }

//     onGlobalFilter(table: Table, event: Event) {
//         table.filterGlobal(
//             (event.target as HTMLInputElement).value,
//             'contains'
//         );
//     }

//     getCandidateList() {
//         return this.http.get<Candidate[]>('http://localhost:9000/candidate/all');
//     }

//     getAllCandidateList() {
//         return this.getCandidateList().subscribe((data) => {
//             this.candidates = data;
//             this.changeDetectorRefs.markForCheck();
//         });
//     }

//     handleEditcandidate(candidateId: number, candidate: Candidate) {
//         console.log("Candidate ID:", candidateId);
//         console.log("Candidate object:", candidate);
//         this.router.navigate(['editcandidate'], { state: { candidateId: candidateId, candidate: candidate } });
//     }

//     candidateDelete(candidate: Candidate) {
//         console.log("Candidate ID:", candidate.id);
//         console.log("Candidate object:", candidate);
//         this.http.delete<Candidate[]>('http://localhost:9000/candidate/' + candidate.id)
//             .subscribe(
//                 (res) => {
//                     console.log(res);
//                     this.getAllCandidateList();
//                 },
//                 (err: HttpErrorResponse) => {
//                     if (err.error instanceof Error) {
//                         console.log('Client-side error occurred.');
//                     } else {
//                         console.log('Server-side error occurred.');
//                     }
//                 }
//             );
//     }

//     loading = [false, false, false, false];

//     // ngOnInit() {
//     //     this.getAllCandidateList();
//     // }
//     ngOnInit() {
//         this.getAllCandidateList().subscribe(() => {
//             // After fetching candidates, create context menu items
//             this.createContextMenuItems();
//         });
//     }

//     private createContextMenuItems() {
//         this.items = this.candidates.map(candidate => ({
//             label: candidate.firstName,
//             icon: 'pi pi-user',
//             command: () => {
//                 this.handleEditcandidate(candidate.id, candidate);
//             }
//         }));
//     }


//     load(index: number) {
//         this.loading[index] = true;
//         setTimeout(() => this.loading[index] = false, 1000);
//     }

//     // items: MenuItem[] = [
//     //     { label: 'Edit', icon: 'pi pi-pencil', command: (event) => this.handleEditcandidate(event.item.id, event.item) },
//     //     { label: 'Delete', icon: 'pi pi-trash', command: (event) => this.candidateDelete(event.item) },
//     //     { separator: true },
//     //     { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
//     //     { separator: true },
//     //     { label: 'Setup', icon: 'pi pi-cog' },
//     //     { label: 'Save', icon: 'pi pi-plus', command: (event) => this.handleEditcandidate(event.item.id, event.item) }
//     // ];
//     items: MenuItem[] = this.candidates.map(candidate => ({
//         label: candidate.firstName, // Assuming you want to display the candidate's name as the label
//         icon: 'pi pi-user', // You can change the icon as needed
//         command: () => {
//             this.handleEditcandidate(candidate.id, candidate);
//         }
//     }));

// }

