import { TestBed } from '@angular/core/testing';

import { QuizzSService } from './quizz-s.service';

describe('QuizzSService', () => {
  let service: QuizzSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
