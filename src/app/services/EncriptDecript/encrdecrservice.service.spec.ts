import { TestBed } from '@angular/core/testing';

import { EncrdecrserviceService } from './encrdecrservice.service';

describe('EncrdecrserviceService', () => {
  let service: EncrdecrserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrdecrserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
