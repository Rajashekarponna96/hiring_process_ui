import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) {

  }
  selectedFile:any
    selectedFile1!:any;
    message: string = '';

  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
  formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post<any>('http://localhost:9000/fileupload/', formData).subscribe(
        (data) => {
         
          this.message = data;
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
      this.selectedFile1 = null;
      this.message = 'Invalid file type. Please select a PDF or Word document.';
    }
  }

  onUpload1(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post<any>('http://localhost:9000/fileupload/', formData).subscribe(
        data => {
          this.message = data;
        },
        error => {
          console.error('Error uploading file:', error);
          this.message = 'Failed to upload file';
        }
      );
    } else {
      console.error('No file selected or invalid file type');
      this.message = 'Please select a valid file first';
    }
  }


  ngOnInit() {
  }

}
