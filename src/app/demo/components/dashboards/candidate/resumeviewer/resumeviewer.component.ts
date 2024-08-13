import { ChangeDetectorRef, Component } from '@angular/core';
import { FileUpload } from '../../../model/fileupload';
import { Pagination } from '../../../model/pagination';
import { FileUploadService } from 'src/app/demo/hiring-process-services/fileupload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumeviewer',
  templateUrl: './resumeviewer.component.html',
  styleUrls: ['./resumeviewer.component.scss']
})
export class ResumeviewerComponent {

  fileuploads: FileUpload[] = [];
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;
  constructor(
    private fileUploadService: FileUploadService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllResumeList();
  }

  getAllResumeList() {
    this.fileUploadService.getResumesListWithPagination(this.currentPage, this.selectedRecordsOption1)
      .subscribe((data: any) => { // Ensure data is of correct type
        this.fileuploads = data.content;
        this.totalElements = data.totalElements; // Assign total elements
        this.totalPages = data.totalPages; // Assign total pages
        this.pagination = data;
      });
  }

  navigateToCreateVendor() {
    this.router.navigate(['createrecandidate']);
  }


  goToFirstPage() {
    this.currentPage = 0;
    this.getAllResumeList();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllResumeList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllResumeList();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllResumeList();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0; // Reset to first page when changing page size
    this.getAllResumeList();
  }

  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);

    this.fileUploadService.searchResumeByCode(inputValue, 0, this.selectedRecordsOption1)
      .subscribe((data: any) => { // Ensure data is of correct type
        this.fileuploads = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0; // Reset to first page
      });
  }


  // New method to view PDF
  viewFile(fileName: string) {
    this.fileUploadService.viewFile(fileName).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

}

