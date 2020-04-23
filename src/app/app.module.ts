import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ArticleService } from './services/article.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { AuthGuardService } from './security/auth.guard';
import { HttpInterceptorService } from './services/http.interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ResumeService } from './services/resume.service';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    })
  ],
  exports: [
    NavBarComponent
  ],
  providers: [
    ArticleService,
    AuthGuardService,
    ResumeService,
    
    // On production when reload the page we will have the 404 error
    // because : With client-side SPAs we have two strategies we can 
    // use to implement client-side routing, one is called the HashLocationStrategy 
    // and the other is called the PathLocationStrategy which is activated by default.
    // on PRODUCTION we will see the '#' character on URLs
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
