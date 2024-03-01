/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TalentpoollistComponent } from './talentpoollist.component';

describe('TalentpoollistComponent', () => {
  let component: TalentpoollistComponent;
  let fixture: ComponentFixture<TalentpoollistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentpoollistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentpoollistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
