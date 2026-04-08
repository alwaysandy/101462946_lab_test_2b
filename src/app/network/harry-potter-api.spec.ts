import { TestBed } from '@angular/core/testing';

import { HarryPotterApi } from './harry-potter-api';

describe('HarryPotterApi', () => {
  let service: HarryPotterApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarryPotterApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
