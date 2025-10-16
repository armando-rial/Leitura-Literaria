import { TestBed } from '@angular/core/testing';

import { Leitura } from './leitura';

describe('Leitura', () => {
  let service: Leitura;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Leitura);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
