import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignjobstorecruiterComponent } from './assignjobstorecruiter.component';

describe('AssignjobstorecruiterComponent', () => {
  let component: AssignjobstorecruiterComponent;
  let fixture: ComponentFixture<AssignjobstorecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignjobstorecruiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignjobstorecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
