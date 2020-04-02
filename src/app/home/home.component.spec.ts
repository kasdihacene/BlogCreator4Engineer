import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { spyOnClass } from "jasmine-es6-spies";
import { ArticleService } from '../services/article.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // add mock of articleService
  let articleService: jasmine.SpyObj<ArticleService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{
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
        description:"To be completed ...",
        descriptionImageUrl:"",
        moreLink:"/"
      },
      {
        title: "Architecture microservices with spring cloud config",
        projectName : "Insrtance Project",
        publicationDate:"12/04/2020",
        author:"Hacene KASDI",
        description:"To be completed ...",
        descriptionImageUrl:"",
        moreLink:"/"
      }
    ]));
    
    fixture.detectChanges();
    
    expect(fixture.nativeElement.querySelectorAll('[data-test=articleItem]').length).toBe(2);
  });


});
