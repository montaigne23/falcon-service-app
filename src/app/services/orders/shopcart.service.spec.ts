import { TestBed } from '@angular/core/testing';

import { ShopcartService } from './shopcart.service';

describe('ShopcartService', () => {
  let service: ShopcartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopcartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
