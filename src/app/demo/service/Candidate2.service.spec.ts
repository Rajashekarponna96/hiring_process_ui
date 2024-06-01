/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Candidate2Service } from './Candidate2.service';

describe('Service: Candidate2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Candidate2Service]
    });
  });

  it('should ...', inject([Candidate2Service], (service: Candidate2Service) => {
    expect(service).toBeTruthy();
  }));
});
