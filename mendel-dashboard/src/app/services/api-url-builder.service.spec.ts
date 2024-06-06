import { TestBed } from '@angular/core/testing';

import { ApiUrlBuilderService } from './api-url-builder.service';

describe('ApiUrlBuilderService', () => {
  let service: ApiUrlBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUrlBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
