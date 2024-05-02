import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateemailComponent } from './createemail.component';

describe('CreateemailComponent', () => {
  let component: CreateemailComponent;
  let fixture: ComponentFixture<CreateemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateemailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
