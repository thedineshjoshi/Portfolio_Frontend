import { TestBed } from '@angular/core/testing';

import { WindowRefService } from './window.service';

describe('WindowService', () => {
  let service: WindowRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
