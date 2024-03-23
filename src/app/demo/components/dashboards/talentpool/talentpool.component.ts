import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TalentPoolOne } from '../../model/talentpoolone';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-talentpool',
  templateUrl: './talentpool.component.html',
  styleUrls: ['./talentpool.component.scss']
})
export class TalentpoolComponent {

  talentpool: TalentPoolOne = { id: 0, name: '', description: '', candidates: [] };
  talentpools: TalentPoolOne[] | undefined;

  @ViewChild("talentpoolForm")
  talentpoolForm!: NgForm;

  constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private router: Router) { }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }
  getTalentPoolList() {
    return this.http.get<TalentPoolOne[]>('http://localhost:9000/talentpool/all');
  }

  getAllTalentPoolList() {
    this.getTalentPoolList().subscribe((data) => {
      console.log(data);
      this.talentpools = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  addTalentPool() {
    this.http.post<TalentPoolOne>('http://localhost:9000/talentPool/', this.talentpool).subscribe(
      res => {
        console.log(res);
        this.getAllTalentPoolList();
        this.talentpoolForm.reset();
        // Navigate to a specific route after saving
        this.router.navigate(['/listtalentpool']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occurred.");
        } else {
          console.log("Server-side error occurred.");
        }
      }
    );
    console.log(JSON.stringify(this.talentpool));
    this.getAllTalentPoolList();
  }

  ngOnInit() {
    this.getAllTalentPoolList();
  }

  onSubmit() {
    // Implement onSubmit logic if needed
  }
}
