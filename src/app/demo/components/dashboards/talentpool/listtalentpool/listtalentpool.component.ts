import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { TalentPoolOne } from '../../../model/talentpoolone';
@Component({
  //selector: 'app-listtalentpool',
  templateUrl: './listtalentpool.component.html',
  //styleUrls: ['./listtalentpool.component.scss']
})
export class ListtalentpoolComponent {


  talentPools: TalentPoolOne[] = [];

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

  ngOnInit() {
    this.getAllTalentPools();
  }

  navigateToCreateTalentPool() {
    this.router.navigate(['/talentpool']);
  }

  handleEditTalentPool(talentPool:TalentPoolOne){
    console.log(talentPool.id)
    localStorage.setItem("id",String(talentPool.id))
    console.log(talentPool);
    localStorage.setItem('editTalentpool', JSON.stringify(talentPool));
    this.router.navigate(['/edittalentpool'])

  }


talentpooldelete(recruiter: TalentPoolOne) {
  return this.http.delete<TalentPoolOne>('http://localhost:9000/talentpool/' + recruiter.id).subscribe(
    res => {
      console.log(res);
      this.getAllTalentPools();
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.error("Client-side error occurred:", err.error.message);
      } else {
        console.error("Server-side error occurred:", err.status, err.message);
      }
    });
}


}
