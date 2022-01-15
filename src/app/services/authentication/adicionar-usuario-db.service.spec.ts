import { TestBed } from '@angular/core/testing';

import { AdicionarUsuarioDbService } from './adicionar-usuario-db.service';

describe('AdicionarUsuarioDbService', () => {
  let service: AdicionarUsuarioDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionarUsuarioDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
