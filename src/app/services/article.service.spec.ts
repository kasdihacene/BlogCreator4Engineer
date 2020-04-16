import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { spyOnClass } from 'jasmine-es6-spies';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule], 
      providers: [{
        HttpClientModule, HttpClient, AuthService,
        provide: ArticleService, useFactory: () => spyOnClass(ArticleService)
    }]});
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
