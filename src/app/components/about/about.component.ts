import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';
import { Information } from 'src/app/models/Information';
import { Social } from 'src/app/models/Social';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private resumeService: ResumeService) { }

  basicInformation$: Information;
  professionalSocials$: Social[];

  ngOnInit(): void {
    this.getBasicInformations();
    this.getProfessionalNetwork();
  }

  getBasicInformations() {
    try {
      this.resumeService.fetchBasicInformation$().subscribe(
        response => {
          if (response == null) {
            console.log("No information found.");
          }
          this.basicInformation$ = JSON.parse(JSON.stringify(response));
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

  getProfessionalNetwork() {
    try {
      this.resumeService.fetchProNetworks$().subscribe(
        response => {
          if (response == null) {
            console.log("No professional network found.");
          }
          this.professionalSocials$ = JSON.parse(JSON.stringify(response));
        },
        error => {
          console.log("An error accured => " + error);
        }
      );
    } catch (error) {
      console.log("ERROR when fetching professional networks.");
      console.log("-> " + error);
    }
  }

}
