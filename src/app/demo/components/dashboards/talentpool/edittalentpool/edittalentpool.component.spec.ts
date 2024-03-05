/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EdittalentpoolComponent } from './edittalentpool.component';

describe('EdittalentpoolComponent', () => {
  let component: EdittalentpoolComponent;
  let fixture: ComponentFixture<EdittalentpoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittalentpoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittalentpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
