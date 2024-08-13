import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeviewerComponent } from './resumeviewer.component';

describe('ResumeviewerComponent', () => {
  let component: ResumeviewerComponent;
  let fixture: ComponentFixture<ResumeviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
