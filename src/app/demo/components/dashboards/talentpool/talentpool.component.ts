import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TalentPoolOne } from '../../model/talentpoolone';
import { Table } from 'primeng/table';
import { TalentpoolService } from 'src/app/demo/hiring-process-services/talentpool.service';

@Component({
  selector: 'app-talentpool',
  templateUrl: './talentpool.component.html',
  styleUrls: ['./talentpool.component.scss']
})
export class TalentpoolComponent implements OnInit {

  talentpool: TalentPoolOne = { id: 0, name: '', description: '', candidates: [] };
  talentpools: TalentPoolOne[] | undefined;

  @ViewChild("talentpoolForm")
  talentpoolForm!: NgForm;

  constructor(
    private talentpoolService: TalentpoolService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllTalentPoolList();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  getAllTalentPoolList() {
    this.talentpoolService.getTalentPoolList().subscribe((data) => {
      console.log(data);
      this.talentpools = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  addTalentPool() {
    this.talentpoolService.addTalentPool(this.talentpool).subscribe(
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
  }

  onSubmit() {
    // Implement onSubmit logic if needed
  }
}

