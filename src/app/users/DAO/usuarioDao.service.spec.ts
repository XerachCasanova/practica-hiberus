import { TestBed } from '@angular/core/testing';
import { UsuarioDaoService } from './usuarioDao.service';



describe('UsersDaoService', () => {
  let service: UsuarioDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
