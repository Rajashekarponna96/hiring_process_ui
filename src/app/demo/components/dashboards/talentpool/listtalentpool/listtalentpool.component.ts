import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { TalentPoolOne } from '../../../model/talentpoolone';
import { Pagination } from '../../../model/pagination';
@Component({
  //selector: 'app-listtalentpool',
  templateUrl: './listtalentpool.component.html',
  styleUrls: ['./listtalentpool.component.scss']
})
export class ListtalentpoolComponent {


  talentPools: TalentPoolOne[] = [];
  selectedRecordsOption1: number = 5;
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }

  getTalentPoolList() {
    return this.http.get<TalentPoolOne[]>('http://localhost:9000/talentPool/all');
  }

  getAllTalentPools() {
    return this.getTalentPoolList()
      .subscribe((data) => {
        console.log(data);
        this.talentPools = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }


  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);
    this.http.get<any>('http://localhost:9000/talentPool/searchpage', {
        params: {
            // firstName: inputValue,
            // lastName:inputValue,
            // email: inputValue
            code:inputValue,
            page: 0,
            size: this.selectedRecordsOption1.toString()

        }
    }).subscribe((data) => {

        this.talentPools = data["content"],
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0; // Reset to first page
         this.changeDetectorRefs.markForCheck();
    });

}
  ngOnInit() {
    this.getAllTalentPools();
    this.getAllTalentPoolList();
  }

  getAllTalentPoolList() {
    this.http.get<any>('http://localhost:9000/talentPool/talentpoollistwithpagination', {

      params: {
        page: this.currentPage.toString(),
        size: this.selectedRecordsOption1.toString()
      }
    }).subscribe((data) => {
      this.talentPools = data.content;
      this.pagination = data;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.changeDetectorRefs.markForCheck();
    });
  }

  navigateToCreateTalentPool() {
    this.router.navigate(['/talentpool']);
  }

  // handleEditTalentPool(talentPool:TalentPoolOne){
  //   console.log(talentPool.id)
  //   localStorage.setItem("id",String(talentPool.id))
  //   console.log(talentPool);
  //   localStorage.setItem('talentpooledit', JSON.stringify(talentPool));
  //   this.router.navigate(['/talentpooledit'])

  // }

  handleEditTalentPool(talentPool: TalentPoolOne) {
    this.router.navigate(['/talentpooledit'], { state: { talentPool: talentPool } });
  }

  talentpooldelete(recruiter: TalentPoolOne) {
    return this.http.delete<TalentPoolOne>('http://localhost:9000/talentpool/' + recruiter.id).subscribe(
      res => {
        console.log(res);
        this.getAllTalentPoolList();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.error("Client-side error occurred:", err.error.message);
        } else {
          console.error("Server-side error occurred:", err.status, err.message);
        }
      });
  }


  goToFirstPage() {
    this.currentPage = 0;
    this.getAllTalentPoolList();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllTalentPoolList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllTalentPoolList();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllTalentPoolList();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0; // Reset to first page when changing page size
    this.getAllTalentPoolList();
  }

}
