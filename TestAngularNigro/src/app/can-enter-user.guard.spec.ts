import { TestBed } from '@angular/core/testing';

import { CanEnterUserGuard } from './can-enter-user.guard';

describe('CanEnterUserGuardGuard', () => {
  let guard: CanEnterUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanEnterUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
