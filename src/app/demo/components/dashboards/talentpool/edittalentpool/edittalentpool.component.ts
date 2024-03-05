import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TalentPoolOne } from '../../../model/talentpoolone';

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

  constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef) { }

  getTalentPoolList() {
    return this.http.get<TalentPoolOne[]>('http://localhost:9000/talentpool/all');
  }

  getAllTalentPools() {
    return this.getTalentPoolList().subscribe((data) => {
      console.log(data);
      this.talentPools = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  ngOnInit() {
    this.getAllTalentPools();
    this.talentPool = JSON.parse(localStorage.getItem('editTalentpool') || '{}');
  }


  updateTalentPool() {
    debugger;
    debugger;
    this.http.put<TalentPoolOne>('http://localhost:9000/talentPool/' + this.talentPool.id, this.talentPool).subscribe(
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




// updateTalentPool() {debugger;
//   this.http.put<TalentPoolOne>('http://localhost:9000/talentpool/' + this.talentPool.id, this.talentPool).subscribe(
//     res => {
//       console.log(res);
//       this.getAllTalentPools();
//       this.talentPoolForm.reset();
//     },
//     (err: HttpErrorResponse) => {
//       if (err.error instanceof Error) {
//         console.log("Client-side error occurred.");
//       } else {
//         console.log("Server-side error occurred.");
//       }
//     });

//   console.log(JSON.stringify(this.talentPool));
// }
//working with out candiate id
// updateTalentPool() {
//   debugger;
//   // Before making the PUT request, remove the 'candidates' property from the talentPool object
//   const { candidates, ...talentPoolWithoutCandidates } = this.talentPool;

//   this.http.put<TalentPoolOne>('http://localhost:9000/talentpool/' + talentPoolWithoutCandidates.id, talentPoolWithoutCandidates).subscribe(
//     res => {
//       console.log(res);
//       this.getAllTalentPools();
//       this.talentPoolForm.reset();
//     },
//     (err: HttpErrorResponse) => {
//       if (err.error instanceof Error) {
//         console.log("Client-side error occurred.");
//       } else {
//         console.log("Server-side error occurred.");
//       }
//     });

//   if (talentPoolWithoutCandidates) {
//     console.log(JSON.stringify(talentPoolWithoutCandidates));
//   } else {
//     console.log("talentPoolWithoutCandidates is null or undefined");
//   }
// }


