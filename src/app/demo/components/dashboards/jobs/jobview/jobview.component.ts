import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Job } from '../../../model/job';
import { MessageService } from 'primeng/api';
import { Blog } from 'src/app/demo/api/blog';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-jobview',
  templateUrl: './jobview.component.html',
  styleUrls: ['./jobview.component.css'],
  providers: [MessageService]
})
export class JobviewComponent implements OnInit {

  @Input() blog!: Blog;
  job: Job = new Job();

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const stateData = history.state || {};
    this.job = stateData['job'];
  }

  //
  uploadedFiles: any[] = [];

  // onUpload(event: any) {
  //   for (const file of event.files) {
  //     if (this.isFileAllowed(file)) {
  //       this.uploadedFiles.push(file);
  //       // Call the backend API to process the uploaded file
  //       this.processResume(file);
  //     } else {
  //       this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'File type not supported' });
  //     }
  //   }
  // }

  processResume(file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:9000/resumes/upload', formData).subscribe(
      (response) => {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Resume uploaded successfully' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload resume' });
      }
    );
  }

  isFileAllowed(file: any): boolean {
    const allowedTypes = ['.pdf', '.doc', '.docx']; // Add more allowed types if needed
    const fileType = '.' + file.name.split('.').pop(); // Extract file extension
    return allowedTypes.includes(fileType.toLowerCase());
  }

  onBasicUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }


  uploadedFile: any;


  onUpload(event: any) {
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:9000/resumes/upload', formData).subscribe(
      (response) => {
        this.uploadedFile = file;
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Resume uploaded successfully' });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload resume' });
      }
    );
  }

  //
  sortField: string = '';
  sortOptions: SelectItem[] = [
    { label: 'Most Shared', value: 'share' },
    { label: 'Most Commented', value: 'comment' }
];


totalBlogs: Blog[] = [
  {
      coverImage: "assets/demo/images/blog/blog-1.png",
      profile: "assets/demo/images/avatar/circle/avatar-f-1.png",
      title: "Blog",
      description: "Ornare egestas pellentesque facilisis in a ultrices erat diam metus integer sed",
      comment: 2,
      share: 7,
      day: "15",
      month: "October"
  },
  {
      coverImage: "assets/demo/images/blog/blog-2.png",
      profile: "assets/demo/images/avatar/circle/avatar-f-2.png",
      title: "Magazine",
      description: "Magna iaculis sagittis, amet faucibus scelerisque non ornare non in penatibus ",
      comment: 5,
      share: 1,
      day: "20",
      month: "Nov"
  },
  {
      coverImage: "assets/demo/images/blog/blog-3.png",
      profile: "assets/demo/images/avatar/circle/avatar-m-1.png",
      title: "Science",
      description: "Purus mattis mi, libero maecenas volutpat quis a morbi arcu pharetra, mollis",
      comment: 2,
      share: 6,
      day: "23",
      month: "Oct"
  },
  {
      coverImage: "assets/demo/images/blog/blog-4.png",
      profile: "assets/demo/images/avatar/circle/avatar-m-1.png",
      title: "Blog",
      description: "Curabitur vitae sit justo facilisi nec, sodales proin aliquet libero volutpat nunc",
      comment: 5,
      share: 5,
      day: "14",
      month: "Dec"
  },
  {
      coverImage: "assets/demo/images/blog/blog-5.png",
      profile: "assets/demo/images/avatar/circle/avatar-f-3.png",
      title: "Magazine",
      description: "Id eget arcu suspendisse ullamcorper dolor lobortis dui et morbi penatibus quam",
      comment: 4,
      share: 1,
      day: "05",
      month: "Apr"
  },
  {
      coverImage: "assets/demo/images/blog/blog-6.png",
      profile: "assets/demo/images/avatar/circle/avatar-m-3.png",
      title: "Science",
      description: "Sagittis hendrerit laoreet dignissim sed auctor sit pellentesque vel diam iaculis et",
      comment: 1,
      share: 3,
      day: "12",
      month: "Nov"
  }
];

}



// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Job } from '../../../model/job';
// import { MessageService } from 'primeng/api';

// @Component({
//   selector: 'app-jobview',
//   templateUrl: './jobview.component.html',
//   styleUrls: ['./jobview.component.css'],
//   providers: [MessageService]
// })
// export class JobviewComponent implements OnInit {
//   job: Job = new Job();

//   constructor(private route: ActivatedRoute, private messageService: MessageService) { }

//   ngOnInit(): void {
//     const stateData = history.state || {};
//     this.job = stateData['job'];
//   }

//   //
//   uploadedFiles: any[] = [];

//   onUpload(event: any) {
//     for (const file of event.files) {
//       if (this.isFileAllowed(file)) {
//         this.uploadedFiles.push(file);
//       } else {
//         this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'File type not supported' });
//       }
//     }
//   }

//   isFileAllowed(file: any): boolean {
//     const allowedTypes = ['.pdf', '.doc', '.docx']; // Add more allowed types if needed
//     const fileType = '.' + file.name.split('.').pop(); // Extract file extension
//     return allowedTypes.includes(fileType.toLowerCase());
//   }

//   onBasicUpload() {
//     this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
//   }


// }
