import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TalentPoolOne } from '../../../model/talentpoolone';

@Component({
  selector: 'app-talentpooledit',
  templateUrl: './talentpooledit.component.html',
  styleUrls: ['./talentpooledit.component.css']
})
export class TalentpooleditComponent implements OnInit {

  @ViewChild("talentPoolForm")
  talentPoolForm!: NgForm;

  talentPool = new TalentPoolOne();

  constructor(private http: HttpClient, private changeDetectorRefs: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() { debugger;
       const talentPoolFromRoute = this.route.snapshot.data['talentPool'];
    if (talentPoolFromRoute) {
      // Set the talent pool fields with the data from the route
      this.talentPool.id = talentPoolFromRoute.id;
      this.talentPool.name = talentPoolFromRoute.name;
      this.talentPool.description = talentPoolFromRoute.description;
      // Add other fields as needed
    }
  }

  updateTalentPool() {
    // Update the talent pool with the new data
    this.http.put<TalentPoolOne>('http://localhost:9000/talentPool/' + this.talentPool.id, this.talentPool).subscribe(
      res => {
        console.log("Updated talent pool:", res);
        // Handle success
        this.talentPoolForm.reset();
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
