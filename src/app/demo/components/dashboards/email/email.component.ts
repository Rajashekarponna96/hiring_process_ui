import { ChangeDetectorRef, Component } from '@angular/core';
import { CandidateEmail } from '../../model/candidateEmail';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NodeService } from 'src/app/demo/service/node.service';
import { Table } from 'primeng/table';
import { Pagination } from '../../model/pagination';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {


  candidateEmails: CandidateEmail[] = [];
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;

  constructor(
    private router: Router,
    private http: HttpClient,
    private changeDetectorRefs: ChangeDetectorRef,
    private nodeService: NodeService
  ) { }

  getEmailList() {
    return this.http.get<CandidateEmail[]>(
        'http://localhost:9000/email/all'
    );
}
getAllEmailList() {
    return this.getEmailList().subscribe((data) => {
        console.log(data);
        this.candidateEmails = data;
        this.changeDetectorRefs.markForCheck();
    });
}

navigateToCreateEmail() {
  this.router.navigate(['createemail']);
}

handleEditEmail(candidateEmail:CandidateEmail , candidateEmailId: number) {
  this.router.navigate(['editemail'], { state: { candidateEmailId: candidateEmailId, candidateEmail: candidateEmail } });
}




EmailDelete(candidateEmail: CandidateEmail) {
  console.log("email id is:" + candidateEmail.id);
  this.http.delete<CandidateEmail[]>('http://localhost:9000/email/' + candidateEmail.id)
    .subscribe(
      (res) => {
        console.log(res);
        this.getAllEmailTemplateList();
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

onGlobalFilter1(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const inputValue = inputElement.value;
  console.log('Input Value:', inputValue);
  this.http.get<any>('http://localhost:9000/email/searchpage', {
    params: {
      code: inputValue,
      page: '0', // Reset to first page when applying filter
      size: this.selectedRecordsOption1.toString()
    }
  }).subscribe((data) => {
    this.candidateEmails = data["content"];
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.currentPage = 0; // Reset to first page
    this.changeDetectorRefs.markForCheck();
  });
}

getAllEmailTemplateList() {
  this.http.get<any>('http://localhost:9000/email/emaillistwithpagination', {

    params: {
      page: this.currentPage.toString(),
      size: this.selectedRecordsOption1.toString()
    }
  }).subscribe((data) => {
    this.candidateEmails = data.content;
    this.pagination = data;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.changeDetectorRefs.markForCheck();
  });
}

ngOnInit() {
  this.getAllEmailList();
  this.getAllEmailTemplateList();
}

goToFirstPage() {
  this.currentPage = 0;
  this.getAllEmailTemplateList();
}

goToPreviousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.getAllEmailTemplateList();
  }
}

goToNextPage() {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.getAllEmailTemplateList();
  }
}

goToLastPage() {
  this.currentPage = this.totalPages - 1;
  this.getAllEmailTemplateList();
}

onRecordsPerPageChange(event: Event) {
  this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
  this.currentPage = 0; // Reset to first page when changing page size
  this.getAllEmailTemplateList();
}


}
