import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { ResumeService } from 'src/app/services/resume.service';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { Information } from 'src/app/models/Information';
import { Social } from 'src/app/models/Social';
import { PrimSkill } from 'src/app/models/PrimSkill';
import { Experience } from 'src/app/models/Experience';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let resumeService: jasmine.SpyObj<ResumeService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      providers: [{
        provide: ResumeService, useFactory: () => spyOnClass(ResumeService)
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get basic informations from html template', () => {
    resumeService = TestBed.get(ResumeService);
    const basicInfos: Information = {
      fullname: "Hacene KASDI",
      profile: "FullStack craftsman engineer",
      image: "assets/images/hacene-kasdi-avatar.jpg",
      address: "Paris, FRANCE",
      email: "administrator@hacene-kasdi.fr",
      website: "https://www.hacene-kasdi.fr"
    };
    resumeService.fetchBasicInformation$.and.returnValue(of(basicInfos));
    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-test="fullname"]').innerText).toEqual("Hacene KASDI");
    expect(fixture.nativeElement.querySelector('[data-test="profile"]').innerText).toEqual("FullStack craftsman engineer");
    expect(fixture.nativeElement.querySelector('[data-test="image"]').src).toContain("assets/images/hacene-kasdi-avatar.jpg");
    expect(fixture.nativeElement.querySelector('[data-test="address"]').innerText).toEqual("Paris, FRANCE");
    expect(fixture.nativeElement.querySelector('[data-test="email"]').innerText).toEqual("administrator@hacene-kasdi.fr");
    expect(fixture.nativeElement.querySelector('[data-test="website"]').innerText).toEqual("https://www.hacene-kasdi.fr");
  });

  it('should get professional networks from html template', () => {
    resumeService = TestBed.get(ResumeService);
    const socials: Social[] = [
      {
        type: "github",
        link: "https://github.com/kasdihacene",
        fa_bootstrap: "fab fa-github-alt"
      }, {
        type: "linkedin",
        link: "https://www.linkedin.com/in/hacene-kasdi-142515120/",
        fa_bootstrap: "fab fa-linkedin-in"
      }];
    resumeService.fetchProNetworks$.and.returnValue(of(socials));
    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('[data-test="socials"]').length).toBe(2);

  });

  it('should get primary skills from html template', () => {
    resumeService = TestBed.get(ResumeService);
    const primSkills: PrimSkill[] = [{
      "type": "JAVA",
      "occurrences": "(TDD, SOLID, FIRST, Clean code)",
      "percentage": "98%"
    }, {
      "type": "Angular",
      "occurrences": "(AngularJS, Angular2+)",
      "percentage": "80%"
    }, {
      "type": "CI/CD",
      "occurrences": "(Jenkins, Github Actions, SonarQube, Docker)",
      "percentage": "90%"
    }, {
      "type": "Cloud",
      "occurrences": "(Development on Cloud Azure PaaS & IaaS)",
      "percentage": "98%"
    }];

    resumeService.fetchPrimarySkills$.and.returnValue(of(primSkills));
    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('[data-test="primarySkills"]').length).toBe(4);

  });


  it('should get experiences from html template', () => {
    resumeService = TestBed.get(ResumeService);
    const experiences: Experience[] = [{
      "mission": "Développeur Java – Cloud Azure",
      "startDate": "Janvier 2019",
      "endDate": "Février 2020",
      "entreprise": "SNCF Voyages",
      "logo": "https://www.sncf.com/themes/contrib/sncf_theme/dist/build/img/logo-sncf.svg?v=1280065105",
      "description": "Programme de migration de l'infrastructure SNCF vers le Cloud pour l’optimisation de la gestion des ressources, au sein d’une équipe de 25 personnes organisée en Agile (Sprints de 3 semaines), Développeur Java Spring boot sur des services Cloud Azure IaaS et PaaS.",
      "technologies": [{
        "type": "Frameworks",
        "occurrences": ["REST API, Spring Security, Spring Cloud, Camel routing, Swagger, Spring JPA, Spring Cloud"]
      },
      {
        "type": "Code quality & CI/CD",
        "occurrences": ["Git, Jenkins, SonarQube, maven, nexus."]
      },
      {
        "type": "Frontend",
        "occurrences": ["HTML5/CSS3, Angular"]
      },
      {
        "type": "Backend",
        "occurrences": ["Java 8, Spring Boot 2.x, Apache tomcat, OpenAM, SQL Server."]
      }
      ],
      "socles": [{
        "type": "Technique",
        "occurrences": [
          "Implémentation des solutions métier en respectant les patterns (DDD, TDD)",
          "Implémentation des POCs approuvés par l’architecte & rédaction des spéc techniques.",
          "Configuration des PaaS/IaaS (VM, webApp, keyVaults, Storage) pour la mise en place des solutions.",
          "Refactoring de code & résolution des bugs",
          "Packaging et déploiement des microservices.",
          "S’assurer du Code quality et CI/CD avec Git, Jenkins (build, release), SonarQube et maven."
        ]
      },
      {
        "type": "Technico-Fonctionnel",
        "occurrences": [
          "Chiffrage des user stories et aide aux spécifications des besoins.",
          "Organisation en Agile.",
          "Conception et développement des microservices."
        ]
      }
      ]
    }];

    resumeService.fetchProExperiences$.and.returnValue(of(experiences));
    component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('[data-test="exps"]').length).toBe(1);

  });

});
