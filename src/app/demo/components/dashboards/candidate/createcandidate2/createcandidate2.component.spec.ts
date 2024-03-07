/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Createcandidate2Component } from './createcandidate2.component';

describe('Createcandidate2Component', () => {
  let component: Createcandidate2Component;
  let fixture: ComponentFixture<Createcandidate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Createcandidate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Createcandidate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
