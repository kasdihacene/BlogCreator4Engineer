import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  constructor() { }

  fetchArticles$(){
    return of([{
      title: "Instance - Bootstrap 4 Portfolio Theme for Aspiring Full Stack Developers",
      projectName : "Insrtance Project",
      publicationDate:"12/04/2020",
      author:"Hacene KASDI",
      description:"You can put one of your secondary projects here. Suspendisse in tellus dolor Vivamus a tortor eu turpis pharetra consequat quis non metus. Aliquam aliquam, orci eu suscipit pellentesque, mauris dui tincidunt enim, eget iaculis ante dolor non turpis.",
      descriptionImageUrl:"assets/images/projects/project-1.png",
      moreLink:"https://themes.3rdwavemedia.com/bootstrap-templates/resume/instance-bootstrap-portfolio-theme-for-developers/"
    },
    {
      title: "Instance - Bootstrap 4 Portfolio Theme for Aspiring Full Stack Developers",
      projectName : "Insrtance Project",
      publicationDate:"12/04/2020",
      author:"Hacene KASDI",
      description:"You can put one of your secondary projects here. Suspendisse in tellus dolor Vivamus a tortor eu turpis pharetra consequat quis non metus. Aliquam aliquam, orci eu suscipit pellentesque, mauris dui tincidunt enim, eget iaculis ante dolor non turpis",
      descriptionImageUrl:"assets/images/projects/project-1.png",
      moreLink:"https://themes.3rdwavemedia.com/bootstrap-templates/resume/instance-bootstrap-portfolio-theme-for-developers/"
    }]);
  }
}
