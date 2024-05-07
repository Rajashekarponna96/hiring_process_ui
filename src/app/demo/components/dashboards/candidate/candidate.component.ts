import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Candidate } from '../../model/candidate';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { Pagination } from '../../model/pagination';

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
    pagination!: Pagination;
    totalElements: number = 0;
    totalPages: number = 0;
    currentPage: number = 0;
    selectedRecordsOption1: number = 5;


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

    onGlobalFilter1(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;
        console.log('Input Value:', inputValue);
        this.http.get<any>('http://localhost:9000/candidate/searchpage', {
          params: {
            code: inputValue,
            page: '0', // Reset to first page when applying filter
            size: this.selectedRecordsOption1.toString()
          }
        }).subscribe((data) => {
          this.candidates = data["content"];
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
          this.currentPage = 0; // Reset to first page
          this.changeDetectorRefs.markForCheck();
        });
      }

    getCandidateList() {
        return this.http.get<Candidate[]>('http://localhost:9000/candidate/all');
    }

    getAllCandidate() {
        return this.getCandidateList().
            subscribe((data) => {
                console.log(data);
                this.candidates = data;
                console.log("candidate list are" + this.candidates)
                this.changeDetectorRefs.markForCheck();
            });
    }

    getAllCandidateList() {
        this.http.get<any>('http://localhost:9000/candidate/candidatelistwithpagination', {

          params: {
            page: this.currentPage.toString(),
            size: this.selectedRecordsOption1.toString()
          }
        }).subscribe((data) => {
          this.candidates = data.content;
          this.pagination = data;
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
          this.changeDetectorRefs.markForCheck();
        });
      }

    handleEditcandidate(candidate: Candidate) {
     const candidateId=candidate.id;

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


    // ngOnInit() {
    //     this.getAllCandidateList();

    // }



    // one
  //   getvendorDetailsById() {debugger;

  //     const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

  //     // Checking if the user is a vendor
  //     if (user.role?.name === 'vendor') {
  //         this.getVendorDetailBasedOnUserId(user.id);
  //     }
  // }
  // // Method to get vendor details based on user ID
  // getVendorDetailBasedOnUserId(userId: any) {debugger;
  //     this.http.get<any>("http://localhost:9000/vendor/user/" + userId).subscribe(
  //         (data) => {
  //             console.log("Vendor details:", data);
  //             this.vendor=data;

  //         },

  //     );


  // }

  // // Method to get candidates by vendor ID
  // getCandidatesByVendorId(vendorId: number) {debugger
  //     debugger;

  //     this.http.get<Candidate[]>('http://localhost:9000/vendor/' + this.vendor.id).subscribe(


  //         // this.http.get<Candidate[]>(`http://localhost:9000/vendor/${vendorId}/candidates`)
  //         // .subscribe(
  //         (data) => {
  //             console.log(data);
  //             this.candidates = data;
  //         },
  //         (error: HttpErrorResponse) => {
  //             console.error("Error fetching candidates by vendor ID:", error);
  //         }
  //     );
  // }
    //one


    vendorId: number=52;

    ngOnInit() {
        // Retrieve the vendor ID from localStorage
        // this.vendorId = parseInt(localStorage.getItem('vendorId') || '0');
        // if (this.vendorId !== 0) {
        //     this.getCandidatesByVendorId(this.vendorId);
        // }
        this.getCandidatesByVendorId(this.vendorId);

    }

    // Method to get candidates by vendor ID
    getCandidatesByVendorId(vendorId: number) {debugger;

        this.http.get<Candidate[]>('http://localhost:9000/vendor/' + this.vendorId).subscribe(


       // this.http.get<Candidate[]>(`http://localhost:9000/vendor/${vendorId}/candidates`)
            // .subscribe(
                (data) => {
                    console.log(data);
                    this.candidates = data;
                },
                (error: HttpErrorResponse) => {
                    console.error("Error fetching candidates by vendor ID:", error);
                }
            );
    }

    //

    goToFirstPage() {
        this.currentPage = 0;
        this.getAllCandidateList();
      }

      goToPreviousPage() {
        if (this.currentPage > 0) {
          this.currentPage--;
          this.getAllCandidateList();
        }
      }

      goToNextPage() {
        if (this.currentPage < this.totalPages - 1) {
          this.currentPage++;
          this.getAllCandidateList();
        }
      }

      goToLastPage() {
        this.currentPage = this.totalPages - 1;
        this.getAllCandidateList();
      }

      onRecordsPerPageChange(event: Event) {
        this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
        this.currentPage = 0; // Reset to first page when changing page size
        this.getAllCandidateList();
      }


}


