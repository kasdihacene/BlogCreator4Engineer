import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { spyOnClass } from "jasmine-es6-spies";
import { ArticleService } from '../services/article.service';
import { of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // add mock of articleService
  let articleService: jasmine.SpyObj<ArticleService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      imports: [HttpClientTestingModule],

      declarations: [HomeComponent],
      providers: [{
        HttpClient,AuthService,
        provide: ArticleService, useFactory: () => spyOnClass(ArticleService)
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  // Mocking Article Service
  it('should return correct fields of article in blog', () => {
    articleService = TestBed.get(ArticleService);
    articleService.fetchArticles$.and.returnValue(of([
      {
        title: "Power of streams in java 8",
        projectName : "Insrtance Project",
        publicationDate:"22/03/2020",
        author:"Hacene KASDI",
        abstract:"To be completed ...",
        image:"",
        link:"/"
      },
      {
        title: "Architecture microservices with spring cloud config",
        projectName : "Insrtance Project",
        publicationDate:"12/04/2020",
        author:"Hacene KASDI",
        abstract:"To be completed ...",
        image:"",
        link:"/"
      }
    ]));
    
    fixture.detectChanges();
    
    expect(fixture.nativeElement.querySelectorAll('[data-test=articleItem]').length).toBe(2);
  });


});
