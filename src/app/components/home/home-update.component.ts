import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-home-update',
  templateUrl: './home-update.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeUpdateComponent implements OnInit {


  constructor(private articleService: ArticleService, private authService: AuthService) { }

  articleForm: FormGroup;
  fileToUpload;
  isFileUpload: boolean;
  isUserAuthenticated: boolean;
  private timer: Observable<any>;

  @Output() messageEvent = new EventEmitter<string>();

  get fields() {
    return this.articleForm.controls;
  }

  ngOnInit(): void {

    this.isUserAuthenticated = this.authService.isUserAuthenticated();

    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(10)]),
      projectName: new FormControl('', [Validators.required, Validators.minLength(10)]),
      link: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      anAbstract: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  isFileSelected() {
    if (this.fileToUpload) { return false; } else { return true; }
  }

  // When we upload file - choose - we stock the file in the variable
  onFileChanged(event) {
    this.isFileUpload = true;
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
  }

  addArticle() {
    this.articleService.postProstImage(this.fileToUpload)
      .subscribe(
        (image: Response) => {
          const imageUrl = JSON.parse(JSON.stringify(image)).postFilename;
          this.articleForm.value.image = imageUrl;

          console.log(this.articleForm.value);

          this.timer = timer(3000); // 3000 millisecond 
          this.timer.subscribe(() => {
            // Refresh post list after 3 seconds
            this.articleService.addArticle(this.articleForm.value);
            this.messageEvent.emit("POST-ADDING");
            //Reset the fields of the Article form
            this.articleForm.reset();
          });

        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  addPost() {
    this.articleForm.value.image = "https://hmu-dedikabylie.chickenkiller.com:8443/images/post/e5a74d46-9ce8-4e0f-a468-d75846812d19blackHole.PNG";
    this.articleService.addArticle(this.articleForm.value);
    this.messageEvent.emit("POST-ADDING");
  }
}