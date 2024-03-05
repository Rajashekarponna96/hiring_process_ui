import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentpoolComponent } from './talentpool.component';

describe('TalentpoolComponent', () => {
  let component: TalentpoolComponent;
  let fixture: ComponentFixture<TalentpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentpoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
