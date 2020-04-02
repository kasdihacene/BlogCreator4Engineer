import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  skills = [
  { line: "Development languages", samples: ["Java", "C#", "Javascript", "Typescript", "Powershell", "Bash"] },
  { line: "Spring Framworks", samples: ["Spring cloud config", "Spring security", "Spring JPA"] },
  { line: "Spring Framworks", samples: ["mongoDB", "Oracle", "SQL Server", "PostgreSQL"] },
  { line: "Code quality & CI/CD", samples: ["Jenkins", "SonarQube", "Git", "maven", "Nexus"] }]
  constructor() { }

  presentation  = "Hacene, 26 years, Fullstack software craftsman."

  

  fetchSkills() {
    return this.skills;
  }

fetchPrez(){
  return this.presentation;
}

}
