import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TalentPoolOne } from '../../../model/talentpoolone';
import { TalentpoolService } from 'src/app/demo/hiring-process-services/talentpool.service';
@Component({
  selector: 'app-edittalentpool',
  templateUrl: './edittalentpool.component.html',
  styleUrls: ['./edittalentpool.component.css']
})
export class EdittalentpoolComponent implements OnInit {

  @ViewChild("talentPoolForm")
  talentPoolForm!: NgForm;

  talentPool = new TalentPoolOne();
  talentPools: TalentPoolOne[] = [];

  constructor(
    private talentpoolService: TalentpoolService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllTalentPools();
    this.talentPool = JSON.parse(localStorage.getItem('editTalentpool') || '{}');
  }

  getAllTalentPools() {
    this.talentpoolService.getTalentPoolList()
      .subscribe((data) => {
        console.log(data);
        this.talentPools = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  updateTalentPool() {
    this.talentpoolService.updateTalentPool(this.talentPool).subscribe(
      res => {
        console.log(res);
        this.getAllTalentPools();
        this.talentPoolForm.reset();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occurred.");
        } else {
          console.log("Server-side error occurred.");
        }
      });

    if (this.talentPool) {
      console.log(JSON.stringify(this.talentPool));
    } else {
      console.log("this.talentPool is null or undefined");
    }
  }
}

//