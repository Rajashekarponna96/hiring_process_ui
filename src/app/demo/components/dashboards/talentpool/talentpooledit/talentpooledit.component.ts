import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TalentPoolOne } from '../../../model/talentpoolone';
import { TalentpoolService } from 'src/app/demo/service/talentpool.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-talentpooledit',
  templateUrl: './talentpooledit.component.html',
  styleUrls: ['./talentpooledit.component.css']
})
export class TalentpooleditComponent implements OnInit {

  @ViewChild("talentPoolForm")
  talentPoolForm!: NgForm;

  talentPool = new TalentPoolOne();

  constructor(
    private talentPoolService: TalentpoolService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    debugger;
    const state = history.state;
    if (state && state.talentPool) {
      this.talentPool = state.talentPool;
    } else {
      // Handle if talent pool object is not passed
      const talentPoolId = this.route.snapshot.paramMap.get('id');
      if (talentPoolId) {
        this.getTalentPoolById(Number(talentPoolId));
      }
    }
  }

  getTalentPoolById(id: number) {
    this.talentPoolService.getTalentPoolById(id).subscribe(
      (data: TalentPoolOne) => {
        this.talentPool = data;
      },
      (error: HttpErrorResponse) => {
        console.error("Error fetching talent pool:", error);
      }
    );
  }

  updateTalentPool() {
    this.talentPoolService.updateTalentPool(this.talentPool).subscribe(
      res => {
        console.log("Updated talent pool:", res);
        // Handle success
        this.talentPoolForm.reset();
        // Redirect to another route
        this.router.navigateByUrl('/listtalentpool');
      },
      (err: HttpErrorResponse) => {
        // Handle errors
        if (err.error instanceof Error) {
          console.log("Client-side error occurred:", err.error.message);
        } else {
          console.log("Server-side error occurred:", err.status, err.message);
        }
      }
    );
  }
}

