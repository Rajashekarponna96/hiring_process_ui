/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TalentpoolinactivecandidatelistComponent } from './talentpoolinactivecandidatelist.component';

describe('TalentpoolinactivecandidatelistComponent', () => {
  let component: TalentpoolinactivecandidatelistComponent;
  let fixture: ComponentFixture<TalentpoolinactivecandidatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentpoolinactivecandidatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentpoolinactivecandidatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
