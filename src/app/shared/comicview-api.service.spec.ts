import { TestBed } from '@angular/core/testing';

import { ComicviewApiService } from './comicview-api.service';

describe('ComicviewApiService', () => {
  let service: ComicviewApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicviewApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
