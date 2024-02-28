import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidate } from '../../model/candidate';
@Component({
    selector: 'app-candidate',
    templateUrl: './candidate.component.html',
    styleUrls: ['./candidate.component.scss'],
})
export class CandidateComponent implements OnInit {
    skillOptions: any[] = [
        { name: 'Java' },
        { name: 'Python' },
        { name: 'C++' },
    ];
    selectedSource: string | null = null;

    candidate!: FormGroup;

    isSubmitted: boolean = false;
    selectedSkills: any[] = []; // Assuming this array holds the selected skills

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.candidate = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            gmail: ['', [Validators.required, Validators.email]],
            mobile: ['', Validators.required],
            source: ['', Validators.required],
            availableTo: ['', Validators.required],
            currentLocation: ['', Validators.required],
            preferredLocation: ['', Validators.required],
            expectedSalary: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            candidateOwner: ['', Validators.required],
            course: [''],
            branch: [''],
            startDate: [''],
            endDate: [''],
            university: [''],
            location: [''],
        });
    }

    onSave(): void {
        console.log('Save button clicked');
    }

    onSubmit(): void {
        this.isSubmitted = true;
        if (this.candidate.valid) {
            console.log('Form submitted successfully!', this.candidate.value);

            const sourceControl = this.candidate.get('source');
            if (sourceControl && sourceControl.value) {
                this.selectedSource = sourceControl.value;
                console.log('Selected Source:', this.selectedSource);
            } else {
                console.log('Source is not selected or form control is null.');
            }

            this.candidate.reset();
        } else {
            console.log('Form has validation errors.');
        }
    }
}
