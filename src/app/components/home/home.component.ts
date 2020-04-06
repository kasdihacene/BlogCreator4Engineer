import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../services/article.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles$;

  constructor(private articleService : ArticleService) { }

  ngOnInit(): void {
    this.articles$ = this.articleService.fetchArticles$();
  }

}
