import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { ResumeService } from 'src/app/services/resume.service';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { Information } from 'src/app/models/Information';
import { Social } from 'src/app/models/Social';

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

});
