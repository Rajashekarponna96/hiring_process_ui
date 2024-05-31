// src/app/components/uploadfile/uploadfile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/demo/service/candidate.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  selectedFile: File | null = null;
  message: string = '';

  constructor(
    private router: Router,
    private fileUploadService: CandidateService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (data) => {
          this.message = 'File uploaded successfully!';
          this.changeDetectorRefs.detectChanges();
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.message = 'Failed to upload file';
        }
      );
    } else {
      console.error('No file selected');
      this.message = 'Please select a file first';
    }
  }

  onFileSelected1(event: any): void {
    const file: File = event.target.files[0];
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (allowedTypes.includes(file.type)) {
      this.selectedFile = file;
      this.message = ''; // Clear any previous error messages
    } else {
      this.selectedFile = null;
      this.message = 'Invalid file type. Please select a PDF or Word document.';
    }
  }

  onUpload1(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (data) => {
          this.message = 'File uploaded successfully!';
          this.changeDetectorRefs.detectChanges();
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.message = 'Failed to upload file';
        }
      );
    } else {
      console.error('No file selected or invalid file type');
      this.message = 'Please select a valid file first';
    }
  }
}

