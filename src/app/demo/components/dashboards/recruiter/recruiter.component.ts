import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recruiter } from '../../model/recruiter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { dE } from '@fullcalendar/core/internal-common';
import { Pagination } from '../../model/pagination';

@Component({
    selector: 'app-recruiter',
    templateUrl: './recruiter.component.html',
    styleUrls: ['./recruiter.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class RecruiterComponent {
    // recruiter: Recruiter = new Recruiter();
    // recrutiers: Recruiter[] = [];
    // myPagination!: Pagination;

    recruiter: Recruiter = new Recruiter();
    recruiters: Recruiter[] = []; // Corrected variable name
    myPagination!: Pagination;

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private http: HttpClient,
        private changeDetectorRefs: ChangeDetectorRef,
        private router: Router
    ) {}

    getRecruiterList() {
        return this.http.get<Recruiter[]>(
            'http://localhost:9000/recruiter/all'
        );
    }
    getAllRecruiterList() {
        return this.getRecruiterList().subscribe((data) => {
            console.log(data);
            this.recruiters = data;
            this.changeDetectorRefs.markForCheck();
        });
    }

    // onGlobalFilter(table: Table, event: Event) {
    //     table.filterGlobal(
    //         (event.target as HTMLInputElement).value,
    //         'contains'
    //     );
    // }

    onGlobalFilter1(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;
        console.log('Input Value:', inputValue);
        this.http.get<any>('http://localhost:9000/recruiter/searchpage', {
            params: {
                // firstName: inputValue,
                // lastName:inputValue,
                // email: inputValue
                code:inputValue,
                page: 0,
                size: 3

            }
        }).subscribe((data) => {

            this.recruiters = data["content"]
             this.changeDetectorRefs.markForCheck();
        });

    }


    // handleEditRecruiter(recruiter: Recruiter) {debugger;
    //     // Navigate to the 'editrecruiter' route with the recruiter object as a parameter in the state
    //     this.router.navigate(['editrecruiter'], { state: { recruiter: recruiter } });
    //   }

    handleEditRecruiter(recruiter: Recruiter) {
        console.log('Recruiter object to edit:', recruiter); // Log the recruiter object
        // Navigate to the 'editrecruiter' route with the recruiter object as a parameter in the state
        this.router.navigate(['editrecruiter'], { state: { recruiter: recruiter } });
    }

    ngOnInit() {
        // Retrieve the recruiter object from history.state

         this.getAllRecruiterList();
        const recruiter = history.state.recruiter;

        // Check if the recruiter object exists
        if (recruiter) {
            // Now you can use the recruiter object directly in your component
            console.log('Recruiter object received:', recruiter); // Log the recruiter object
            // Populate the form fields with the received recruiter data
            this.recruiter = recruiter;
        } else {
            console.error('Recruiter data is missing in state.');
        }
    }



    // ngOnInit() {
    //     this.getAllRecruiterList();

    //     // Access the recruiter object from history.state
    //     const recruiter = history.state.recruiter;

    //     // Check if the recruiter object exists
    //     if (recruiter) {
    //         // Now you can use the recruiter object directly in your component
    //         console.log(recruiter); // Log the recruiter object
    //     } else {
    //         console.error('Recruiter data is missing in state.');
    //     }
    // }

    navigateToCreateRecruiter() {
        this.router.navigate(['createrecruiter']);
    }
    //
    recruiterdelete(recruiter: Recruiter) {
        debugger;
        this.http
            .delete<Recruiter>(
                'http://localhost:9000/recruiter/' + recruiter.id
            )
            .subscribe(
                (res) => {
                    console.log(res);
                    this.getAllRecruiterList();
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

    confirmDelete(recruiter: Recruiter) {
        debugger;
        this.confirmationService.confirm({
            key: 'confirmDelete',
            message: 'Are you sure that you want to delete this recruiter?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.recruiterdelete(recruiter);
            },
        });
    }


    goToFirstPage(){};
    goToPreviousPage(){};
    goToNextPage(){};
    goToLastPage(){};
    //
}
