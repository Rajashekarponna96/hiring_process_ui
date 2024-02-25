import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
 // selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  //styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  constructor(private layoutService: LayoutService) {}

}
