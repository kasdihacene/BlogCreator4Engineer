import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { spyOnClass } from "jasmine-es6-spies";
import { ArticleService } from '../services/article.service';
import { HomeUpdateComponent } from './home-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('HomeAddComponent', () => {

    let component: HomeUpdateComponent;
    let fixture: ComponentFixture<HomeUpdateComponent>;
    // add mock of articleService
    let articleService: jasmine.SpyObj<ArticleService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
            declarations: [HomeComponent, HomeUpdateComponent],
            providers: [{
                HttpClientModule, HttpClient, AuthService,
                provide: ArticleService, useFactory: () => spyOnClass(ArticleService)
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeUpdateComponent);
        component = fixture.componentInstance;
        component.ngOnInit();// To initialize the artcileForm
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        fixture.detectChanges();
    });

    it('Article form should be invalid when empty', () => {
        expect(component.articleForm.valid).toBeFalsy();
    });

    it('An article should be added when calling addArticle', () => {
        articleService = TestBed.get(ArticleService);
        component.articleForm.controls['title'].setValue("an awesome article was published");
        component.articleForm.controls['projectName'].setValue("project name for test");
        component.articleForm.controls['link'].setValue("this is a link");
        component.articleForm.controls['author'].setValue("it's me");
        component.articleForm.controls['abstract'].setValue("this is the abstract");

        expect(component.articleForm.valid).toBe(true);
        expect(articleService.fetchArticles$.length).toBe(0);

        fixture.autoDetectChanges();

        component.addArticle();
        expect(articleService.addArticle).toHaveBeenCalledTimes(1);

    });


});
