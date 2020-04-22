import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../services/article.service";
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postArticles$: Post[];
  recentPost: Post;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts(): void {
    try {
      this.articleService.fetchPosts().subscribe(
        response => {
          if (response == null) {
            console.log("No post published yet.");
          }
          console.log("get all posts : " + response);
          let posts: Post[] = JSON.parse(JSON.stringify(response)).posts;
          this.recentPost = posts.pop();
          console.log("0000000000000> "+this.recentPost.image)
          console.log("0000000000000> "+this.recentPost.title)
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

  receiveMessage($event) {
    console.log("----> " + $event);
    setTimeout(() => {
      this.getAllPosts();
    }, 3000);
  }

}
