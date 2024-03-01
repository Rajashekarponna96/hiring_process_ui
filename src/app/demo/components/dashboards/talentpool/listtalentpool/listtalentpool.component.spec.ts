import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtalentpoolComponent } from './listtalentpool.component';

describe('ListtalentpoolComponent', () => {
  let component: ListtalentpoolComponent;
  let fixture: ComponentFixture<ListtalentpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtalentpoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtalentpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
