import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InformationService } from './services/information.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ArticleService } from './services/article.service';
import { HomeUpdateComponent } from './home/home-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    HomeUpdateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    NavBarComponent,
    HomeUpdateComponent
  ],
  providers: [
    InformationService,
    ArticleService],
  bootstrap: [AppComponent, BlogComponent]
})
export class AppModule { }
