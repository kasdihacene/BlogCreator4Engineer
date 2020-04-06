import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  constructor() { }

  articles = [{
    title: "Instance - Bootstrap 4 Portfolio Theme for Aspiring Full Stack Developers",
    projectName : "Insrtance Project",
    publicationDate:"12/04/2020",
    author:"Hacene KASDI",
    abstract:"You can put one of your secondary projects here. Suspendisse in tellus dolor Vivamus a tortor eu turpis pharetra consequat quis non metus. Aliquam aliquam, orci eu suscipit pellentesque, mauris dui tincidunt enim, eget iaculis ante dolor non turpis.",
    image:"assets/images/projects/project-1.png",
    link:"https://themes.3rdwavemedia.com/bootstrap-templates/resume/instance-bootstrap-portfolio-theme-for-developers/"
  },
  {
    title: "Instance - Bootstrap 4 Portfolio Theme for Aspiring Full Stack Developers",
    projectName : "Insrtance Project",
    publicationDate:"12/04/2020",
    author:"Hacene KASDI",
    abstract:"You can put one of your secondary projects here. Suspendisse in tellus dolor Vivamus a tortor eu turpis pharetra consequat quis non metus. Aliquam aliquam, orci eu suscipit pellentesque, mauris dui tincidunt enim, eget iaculis ante dolor non turpis",
    image:"assets/images/projects/project-1.png",
    link:"https://themes.3rdwavemedia.com/bootstrap-templates/resume/instance-bootstrap-portfolio-theme-for-developers/"
  }];

  addArticle(article){
    this.articles.push(article);
  }

  fetchArticles$(){
    return of(this.articles);
  }
}
