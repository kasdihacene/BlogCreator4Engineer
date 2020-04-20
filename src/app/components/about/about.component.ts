import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';
import { Information } from 'src/app/models/Information';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private resumeService: ResumeService) { }

  basicInformation$: Information ;

  ngOnInit(): void {
    this.getBasicInformations();
  }

  getBasicInformations() {
    try {
      this.resumeService.fetchBasicInformation$().subscribe(
        response => {
          if (response == null) {
            console.log("No information found.");
          }
          console.log("get basic information : " + response);
          this.basicInformation$ = JSON.parse(JSON.stringify(response));

          return this.basicInformation$;
        },
        error => {
          console.log("An error accured => " + error);
        }
      );
    } catch (error) {
      console.log("ERROR when fetching basic Informations.");
      console.log("-> " + error);
    }
  }

}
