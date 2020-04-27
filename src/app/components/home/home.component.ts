import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../services/article.service";
import { Post } from 'src/app/models/Post';
import { environment } from 'src/environments/environment';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postArticles$: Post[];
  recentPost: Post;
  serverUrl: string = environment._ENDPOINT_SERVER_API;
  isUserAuthenticated: boolean;


  private timer: Observable<any>;
  errorMessage: string;
  successMessage: string;

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
          this.recentPost = posts.pop();
          posts.reverse();
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

  remove(data) {

    this.articleService.removePostById(data.idPost).subscribe(
      response => {
        if (response) {
          this.showNotification("SUCCESS", "A post [ " + data.title + " ] will be deleted !");
          this.refreshPosts();
        }
      },
      error => {
        this.showNotification("ERROR", "An error occurred when deleting post [ " + data.title + " ] !");
        console.log(error);
      }
    );
  }

  receiveMessage($event) {
    this.refreshPosts();
  }

  isUserConnected($event) {
    this.isUserAuthenticated = $event;
  }

  refreshPosts() {
    setTimeout(() => {
      this.getAllArticles();
    }, 3000);
  }

  showNotification(typeMessage, message) {
    this.timer = timer(5000); // 5000 millisecond 

    if (typeMessage == "ERROR") { this.errorMessage = message; }

    if (typeMessage == "SUCCESS") { this.successMessage = message; }

    this.timer.subscribe(() => {
      this.errorMessage = "";
      this.successMessage = "";
    });
  }
}
