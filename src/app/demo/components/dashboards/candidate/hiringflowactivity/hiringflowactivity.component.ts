import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-hiringflowactivity',
  templateUrl: './hiringflowactivity.component.html',
  styleUrls: ['./hiringflowactivity.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class HiringflowactivityComponent implements OnInit {
  currentStep: number = 0;
  totalSteps = 6;

  steps: MenuItem[] = [
    { label: 'Sourced', command: (event) => { this.goToStep(0); } },
    { label: 'Screening', command: (event) => { this.goToStep(1); } },
    { label: 'Interview', command: (event) => { this.goToStep(2); } },
    { label: 'Preboarding', command: (event) => { this.goToStep(3); } },
    { label: 'Hired', command: (event) => { this.goToStep(4); } },
    { label: 'Archived', command: (event) => { this.goToStep(5); } }
  ];

  constructor() { }

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

  ngOnInit() { }
}

