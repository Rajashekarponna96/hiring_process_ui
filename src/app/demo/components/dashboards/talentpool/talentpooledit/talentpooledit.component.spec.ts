/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TalentpooleditComponent } from './talentpooledit.component';

describe('TalentpooleditComponent', () => {
  let component: TalentpooleditComponent;
  let fixture: ComponentFixture<TalentpooleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentpooleditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentpooleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
