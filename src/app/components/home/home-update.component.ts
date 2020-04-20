import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-update',
  templateUrl: './home-update.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeUpdateComponent implements OnInit {


  constructor(private articleService: ArticleService, private authService: AuthService) { }

  articleForm: FormGroup;
  isUserAuthenticated: boolean;

  @Output() messageEvent = new EventEmitter<string>();

  get fields() {
    return this.articleForm.controls;
  }

  addArticle() {
    this.articleForm.value.image = "assets/images/projects/java-streams/streamsJava.PNG";
    console.log(this.articleForm.value);
    this.articleService.addArticle(this.articleForm.value);
    // Reset the fields of the Article form
    this.messageEvent.emit("POST-ADDING");
    this.articleForm.reset();
  }

  ngOnInit(): void {

    this.isUserAuthenticated = this.authService.isUserAuthenticated();

    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      projectName: new FormControl('', [Validators.required, Validators.minLength(10)]),
      link: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      anAbstract: new FormControl('', Validators.required),
      image: new FormControl('')
    });
  }

}