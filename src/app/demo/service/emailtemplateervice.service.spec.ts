/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmailtemplateerviceService } from './emailtemplateervice.service';

describe('Service: Emailtemplateervice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailtemplateerviceService]
    });
  });

  it('should ...', inject([EmailtemplateerviceService], (service: EmailtemplateerviceService) => {
    expect(service).toBeTruthy();
  }));
});
