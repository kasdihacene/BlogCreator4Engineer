import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { spyOnClass } from "jasmine-es6-spies";
import { ArticleService } from '../../services/article.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let httpClient: HttpClient;
  let articleService: jasmine.SpyObj<ArticleService>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [FormsModule, HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [{
        HttpClientModule, HttpClient, AuthService,
        provide: ArticleService, useFactory: () => spyOnClass(ArticleService)
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    articleService = TestBed.get(ArticleService);

    let posts = {
      "posts": [
        {
          idPost: 1,
          title: "Power of streams in java 8",
          projectName: "Insrtance Project",
          publicationDate: "22/03/2020",
          link: "/",
          author: "Hacene KASDI",
          anAbstract: "To be completed ...",
          image: ""
        },
        {
          idPost: 2,
          title: "Power of streams in java 8",
          projectName: "Insrtance Project",
          publicationDate: "22/03/2020",
          link: "/",
          author: "Hacene KASDI",
          anAbstract: "To be completed ...",
          image: ""
        },
        {
          idPost: 44,
          title: "Power of streams in java 8",
          projectName: "Insrtance Project",
          publicationDate: "22/03/2020",
          link: "/",
          author: "Hacene KASDI",
          anAbstract: "To be completed ...",
          image: ""
        }
      ]
    };

    articleService.fetchArticles.and.returnValue(of(posts));
    component.isUserAuthenticated = true;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Mocking Article Service
  it('should fetch all posts', () => {

    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('[data-test="articleItem"]').length).toBe(2);

  });

  it('should remove a post when delete asked', () => {
    spyOn(component, 'remove');

    fixture.debugElement.nativeElement.querySelector('.remove').click();

    expect(component.remove).toHaveBeenCalled();

  });


});
