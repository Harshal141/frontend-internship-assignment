import { TestBed } from '@angular/core/testing';

import { CachingInterceptor } from './caching-interceptor.service';

describe('CachingInterceptor', () => {
  let service: CachingInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CachingInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
