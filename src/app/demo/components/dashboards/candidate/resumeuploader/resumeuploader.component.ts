import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FileUploadService } from 'src/app/demo/hiring-process-services/fileupload.service';
import { FileUpload } from '../../../model/fileupload';
import { Pagination } from '../../../model/pagination';

@Component({
  selector: 'app-resumeuploader',
  templateUrl: './resumeuploader.component.html',
  styleUrls: ['./resumeuploader.component.css']
})
export class ResumeuploaderComponent implements OnInit {

  fileupload: FileUpload = new FileUpload();
  fileuploads: FileUpload[] = [];
  pagination: Pagination = {
    content: [], totalElements: 0, totalPages: 0, number: 0, size: 5,
    pageable: undefined,
    first: false,
    last: false
  };
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
    this.getAllResumes();
  }

  getAllResumes() {debugger;
    this.fileUploadService.getResumesListWithPagination(this.currentPage, this.selectedRecordsOption1)
      .subscribe((data: any) => {
        this.fileuploads = data.content;
        //console.log("The resumes are"+this.fileuploads)
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }

  handleEditJob(fileupload: FileUpload) {
    this.router.navigate(['editjob'], { state: { job: fileupload } });
  }

  Jobdelete(fileupload: FileUpload) {
    // This is just a placeholder for actual delete implementation
    // this.fileUploadService.deleteResume(fileupload.id)
    //   .subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       this.getAllResumes();
    //     },
    //     (err: HttpErrorResponse) => {
    //       console.error('Error occurred:', err);
    //     }
    //   );
  }

  navigateToCreateJob() {
    this.router.navigate(['createjob']);
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getAllResumes();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllResumes();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllResumes();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllResumes();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.getAllResumes();
  }

  onGlobalFilter1(event: Event) {
  //   const inputValue = (event.target as HTMLInputElement).value;
  //   //this.fileUploadService.searchResumesByName(inputValue, 0, this.selectedRecordsOption1)
  //     .subscribe((data: any) => {
  //       this.fileuploads = data.content;
  //       this.totalElements = data.totalElements;
  //       this.totalPages = data.totalPages;
  //       this.currentPage = 0;
  //       this.changeDetectorRefs.markForCheck();
  //     });
   }

   navigateToCreateClient(){

   }
   handleEditResume(fileupload: FileUpload, resumeId: number) {
    //this.router.navigate(['editclient'], { state: { clientId: clientId, client: client } });
  }

  ResumeDelete(fileupload: FileUpload) {
  }

  openNew(fileupload: FileUpload){

  }
}