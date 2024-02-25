import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBoardingComponent } from './pre-boarding.component';

describe('PreBoardingComponent', () => {
  let component: PreBoardingComponent;
  let fixture: ComponentFixture<PreBoardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreBoardingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
