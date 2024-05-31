/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TalentpoolService } from './talentpool.service';

describe('Service: Talentpool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TalentpoolService]
    });
  });

  it('should ...', inject([TalentpoolService], (service: TalentpoolService) => {
    expect(service).toBeTruthy();
  }));
});
