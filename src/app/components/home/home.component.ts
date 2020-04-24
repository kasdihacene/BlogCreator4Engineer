import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../services/article.service";
import { Post } from 'src/app/models/Post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postArticles$: Post[];
  recentPost: Post;
  serverUrl: string = environment._ENDPOINT_SERVER_API;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  private getAllArticles(): void {
    try {
      this.articleService.fetchArticles().subscribe(
        response => {
          if (response == null) {
            console.log("No post published yet.");
          }
          console.log("get all posts... ");
          let posts: Post[] = JSON.parse(JSON.stringify(response)).posts;
          posts.reverse();
          this.recentPost = posts.pop();
          this.postArticles$ = posts;

          return this.postArticles$;
        },
        error => {
          console.log("An error accured => " + error);
        }
      );
    } catch (error) {
      console.log("ERROR when fetching Posts.");
      console.log("-> " + error);
    }
  }

}
