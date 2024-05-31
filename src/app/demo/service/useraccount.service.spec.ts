/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UseraccountService } from './useraccount.service';

describe('Service: Useraccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UseraccountService]
    });
  });

  it('should ...', inject([UseraccountService], (service: UseraccountService) => {
    expect(service).toBeTruthy();
  }));
});
