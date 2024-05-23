/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AssignjobstovendorComponent } from './assignjobstovendor.component';

describe('AssignjobstovendorComponent', () => {
  let component: AssignjobstovendorComponent;
  let fixture: ComponentFixture<AssignjobstovendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignjobstovendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignjobstovendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
