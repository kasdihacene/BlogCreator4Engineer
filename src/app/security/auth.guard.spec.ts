import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth.guard';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
      

describe('AuthGuard', () => {
  let guard: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [AuthService, HttpClient]
    });
    guard = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
