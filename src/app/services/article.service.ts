import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Post } from '../models/Post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  REST_API_SERVER = environment._ENDPOINT_SERVER_API;
  posts$: Post[];

  constructor(private httpClient: HttpClient) { }

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
    return throwError(error.error.message);
  }


  addArticle(post) {
    return this.httpClient
      .post(this.REST_API_SERVER.concat(environment._ENDPOINT_InsertPost), post)
      .pipe(catchError(this.handleError)).subscribe(
        (article: Post) => {
          //console.log("POST ADDED : " + JSON.parse(JSON.stringify(article)))
          return article;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }


  fetchArticles(): Observable<Post[]> {
    return this.httpClient
      .get(this.REST_API_SERVER.concat(environment._ENDPOINT_AllPosts))
      .pipe(
        tap((data: Post[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  postProstImage(fileToUpload): Observable<any> {
    const formData: any = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);

    return this.httpClient.post(this.REST_API_SERVER.concat(environment._ENDPOINT_PostImage), formData);
  }

}
