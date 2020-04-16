import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Token } from '../models/Token';
import * as jwt_decode from 'jwt-decode';
import { GlobalVariables } from '../models/global-variables';

@Injectable({ providedIn: 'root' })
export class AuthService {

  REST_API_SERVER = "https://hmu-dedikabylie.chickenkiller.com:8443";
  //REST_API_SERVER = "http://localhost:8443";
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
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getToken(): Observable<Token> {
    return this.httpClient
      .get<Token>(this.REST_API_SERVER.concat("/token/generate"), this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  private decode(token): Date {
    const decoded = jwt_decode(token);

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('TOKEN');
    return !this.isExpired(token);
  }
  
  getLocalToken(){
    const token = localStorage.getItem('TOKEN');
    return token;
  }

  private persistToken(token: string) {
    localStorage.setItem("TOKEN", token)
  }

  public removeToken() {
    localStorage.removeItem("TOKEN")
  }
  
  public validateAndPersist(token: string): boolean {

    const expired = this.isExpired(token);
    if (expired == false) {
      this.persistToken(token);
      return true;
    }

    return false;
  }

  public isExpired(token: string): boolean {
    if (token === null || token === undefined) return true;
    const currentDate = new Date();
    const expirationDate = this.decode(token);

    return currentDate > expirationDate;
  }

  public login(email: string, psword: string) {

    const body = { "email": email, "psword": psword };
    return this.httpClient
      .post(this.REST_API_SERVER.concat("/user/login"), body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


}
