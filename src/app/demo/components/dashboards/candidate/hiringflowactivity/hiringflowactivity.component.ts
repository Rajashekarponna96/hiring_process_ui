import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-hiringflowactivity',
  templateUrl: './hiringflowactivity.component.html',
  styleUrls: ['./hiringflowactivity.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class HiringflowactivityComponent implements OnInit {


  currentStep: number = 0; totalSteps = 7;
  tabs: string[] = ['Profile', 'Hiring Flow', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived'];


  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
  goToStep(step: number) {
    this.currentStep = step;
  }
}

