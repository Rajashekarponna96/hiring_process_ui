import { HttpClient } from '@angular/common/http';
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
    return this.http.get<TalentPoolOne[]>('http://localhost:9000/talentPool/all'); // Adjust the URL
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

}
