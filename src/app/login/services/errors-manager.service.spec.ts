import { TestBed } from '@angular/core/testing';

import { ErrorsManagerService } from './errors-manager.service';

describe('ErrorsManagerService', () => {
  let service: ErrorsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
