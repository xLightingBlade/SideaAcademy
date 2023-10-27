import { TestBed } from '@angular/core/testing';

import { CanEnterPlaceGuard } from './can-enter-place.guard';

describe('CanEnterGuard', () => {
  let guard: CanEnterPlaceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanEnterPlaceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
