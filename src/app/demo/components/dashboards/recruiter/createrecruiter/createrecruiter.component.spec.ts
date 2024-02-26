import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaterecruiterComponent } from './createrecruiter.component';

describe('CreaterecruiterComponent', () => {
  let component: CreaterecruiterComponent;
  let fixture: ComponentFixture<CreaterecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaterecruiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaterecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
