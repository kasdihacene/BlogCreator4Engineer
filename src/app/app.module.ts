import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InformationService } from './services/information.service';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ArticleService } from './services/article.service';
import { HomeUpdateComponent } from './components/home/home-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './security/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from './services/http.interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    HomeUpdateComponent,
    LoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    NavBarComponent,
    HomeUpdateComponent
  ],
  providers: [
    InformationService,
    ArticleService,
    AuthService,
    AuthGuardService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
