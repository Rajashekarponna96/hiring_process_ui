/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackupService } from './backup.service';

describe('Service: Backup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackupService]
    });
  });

  it('should ...', inject([BackupService], (service: BackupService) => {
    expect(service).toBeTruthy();
  }));
});
