import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recruiter } from '../../model/recruiter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-recruiter',
    templateUrl: './recruiter.component.html',
    styleUrls: ['./recruiter.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class RecruiterComponent {
    recruiter: Recruiter = new Recruiter();
    recrutiers: Recruiter[] = [];

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
            this.recrutiers = data;
            this.changeDetectorRefs.markForCheck();
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    handleEditRecruiter(recruiter: Recruiter) {
        console.log(recruiter.id);
        localStorage.setItem('id', String(recruiter.id));
        console.log(recruiter);
        localStorage.setItem('editRecruiter', JSON.stringify(recruiter));
        this.router.navigate(['editrecruiter']);
    }

    ngOnInit() {
        this.getAllRecruiterList();
    }

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

    //
}
