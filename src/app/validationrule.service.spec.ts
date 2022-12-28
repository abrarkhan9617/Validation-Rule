import { TestBed } from '@angular/core/testing';

import { ValidationruleService } from './validationrule.service';

describe('ValidationruleService', () => {
  let service: ValidationruleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationruleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
