import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Information } from '../models/Information';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Social } from '../models/Social';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  REST_API_SERVER = environment._ENDPOINT_JSON_SERVER_API;
  
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
    return throwError(
      'Something bad happened; please try again later.');
  }
  
  fetchBasicInformation$(): Observable<Information> {
    return this.httpClient
      .get(this.REST_API_SERVER.concat(environment._ENDPOINT_JSON_INFOS))
      .pipe(
        tap((data: Information) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  fetchProNetworks$() : Observable<Social[]> {
    return this.httpClient
      .get(this.REST_API_SERVER.concat(environment._ENDPOINT_JSON_SOCIALS))
      .pipe(
        tap((data: Social[]) => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

}
