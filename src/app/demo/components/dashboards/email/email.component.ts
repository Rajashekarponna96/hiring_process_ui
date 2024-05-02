import { ChangeDetectorRef, Component } from '@angular/core';
import { CandidateEmail } from '../../model/candidateEmail';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NodeService } from 'src/app/demo/service/node.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {


  candidateEmails: CandidateEmail[] = [];

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


onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
  );
}

EmailDelete(candidateEmail: CandidateEmail) {
  console.log("email id is:" + candidateEmail.id);
  this.http.delete<CandidateEmail[]>('http://localhost:9000/email/' + candidateEmail.id)
    .subscribe(
      (res) => {
        console.log(res);
        this.getAllEmailList();
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


ngOnInit() {
  this.getAllEmailList();
}

}
