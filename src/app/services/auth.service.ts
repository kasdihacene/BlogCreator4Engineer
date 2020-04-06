import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Token } from '../security/Token';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  REST_API_SERVER = "http://localhost:9090/token/generate";
  constructor(private httpClient: HttpClient) {
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return true;
    //return !this.jwtHelper.isTokenExpired(token);
  }

  checkTokenValidation(token): boolean {

    return false;
  }

  public getToken(): Observable<Token> {
    return this.httpClient
      .get<Token>(this.REST_API_SERVER, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  private decode(token): Date {
    const decoded = jwt_decode(token);

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired(token: string): boolean {
    if (token === undefined) return false;
    const currentDate = new Date();
    const expirationDate = this.decode(token);

    console.log(currentDate);
    console.log(expirationDate);

    return currentDate > expirationDate;
  }


}
