import { TestBed } from '@angular/core/testing';

import { CreateRegFormService } from './create-reg-form.service';

describe('CreateRegFormService', () => {
  let service: CreateRegFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRegFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
