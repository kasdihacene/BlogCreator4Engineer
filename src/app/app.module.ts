import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InformationService } from './services/information.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ArticleService } from './services/article.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    InformationService,
    ArticleService],
  bootstrap: [AppComponent, BlogComponent]
})
export class AppModule { }
