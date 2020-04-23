import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { spyOnClass } from "jasmine-es6-spies";
import { ArticleService } from '../../services/article.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Post } from 'src/app/models/Post';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let httpClient: HttpClient;
  let articleService: ArticleService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [FormsModule, HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [{
        HttpClientModule, HttpClient,
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

    // Spy on and mock httpClient 
    httpClient = TestBed.get(HttpClient);
    let posts: Post[];
    posts = [
      {
        title: "Power of streams in java 8",
        projectName: "Insrtance Project",
        publicationDate: "22/03/2020",
        link: "/",
        author: "Hacene KASDI",
        anAbstract: "To be completed ...",
        image: ""
      },
      {
        title: "Power of streams in java 8",
        projectName: "Insrtance Project",
        publicationDate: "22/03/2020",
        link: "/",
        author: "Hacene KASDI",
        anAbstract: "To be completed ...",
        image: ""
      }
    ];
    // Use our service to get list of posts

    // Verify that our service returns the mocked data as supposed

    // Verify that the service call the right Http endpoint
  });


});
