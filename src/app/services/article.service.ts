import { Injectable } from '@angular/core';
import { of, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Post } from '../models/Post';
import { GlobalVariables } from '../models/global-variables';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  REST_API_SERVER = "https://hmu-dedikabylie.chickenkiller.com:8443";
  //REST_API_SERVER = "http://localhost:8443";
  constructor(private httpClient: HttpClient) {
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  addArticle(post) {

    return this.httpClient
      .post(this.REST_API_SERVER.concat("/post/insert"), post)
      .pipe(catchError(this.handleError)).subscribe(
        (article: Post) => {
          return article;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  posts$: Post[];

  fetchPosts(): Observable<Post[]> {
    return this.httpClient
      .get(this.REST_API_SERVER.concat("/post/all"))
      .pipe(
        tap((data: Post[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }


}
