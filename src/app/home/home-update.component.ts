import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home-update',
  templateUrl: './home-update.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeUpdateComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  articleForm;

  get fields() {
    return this.articleForm.controls;
  }

  addArticle() {
    this.articleForm.value.publicationDate = Date.now();
    this.articleForm.value.image = "assets/images/projects/project-1.png";
    console.log(this.articleForm.value);
    this.articleService.addArticle(this.articleForm.value);
    // Reset the fields of the Article form
    this.articleForm.reset();
  }

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      projectName: new FormControl('', [Validators.required, Validators.minLength(10)]),
      publicationDate: new FormControl(''),
      link: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      abstract: new FormControl('', Validators.required),
      image: new FormControl('')
    });
  }

}