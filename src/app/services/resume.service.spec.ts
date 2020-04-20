import { TestBed } from '@angular/core/testing';

import { ResumeService } from './resume.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Information } from '../models/Information';
import { of } from 'rxjs';
import { Social } from '../models/Social';
import { environment } from 'src/environments/environment';

describe('ResumeService', () => {
  let service: ResumeService;
  let httpClient: HttpClient;
  let REST_API_SERVER = environment._ENDPOINT_JSON_SERVER_API;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', () => {
    service = TestBed.get(ResumeService);
    expect(service).toBeTruthy();
  });

  it('should return resume basic information as array of BasiInfo', () => {
    httpClient = TestBed.get(HttpClient);
    const basicInfos : Information = {
      fullname: "Hacene KASDI",
      profile: "FullStack craftsman engineer",
      image: "assets/images/hacene-kasdi-avatar.jpg",
      address: "Paris, FRANCE",
      email: "administrator@hacene-kasdi.fr",
      website: "https://www.hacene-kasdi.fr"
    };

    spyOn(httpClient, "get").and.returnValue(of(basicInfos));

    // Use the service to get information
    service = TestBed.get(ResumeService);
    const spy = jasmine.createSpy('spy');
    service.fetchBasicInformation$().subscribe(spy);

    // Verify the returned data
    expect(spy).toHaveBeenCalledWith(basicInfos);

    // verify that the service called with a proper endpoint
    expect(httpClient.get).toHaveBeenCalledWith(REST_API_SERVER.concat("/informations"));
  });

  it('should return social network occurrences as Social entity', () => {
    httpClient = TestBed.get(HttpClient);
    const socials : Social[] = [
    {
      type : "github",
      link: "https://github.com/kasdihacene",
      fa_bootstrap: "fab fa-github-alt"
    },{
      type: "linkedin",
      link: "https://www.linkedin.com/in/hacene-kasdi-142515120/",
      fa_bootstrap: "fab fa-linkedin-in"
  }];

    spyOn(httpClient, "get").and.returnValue(of(socials));

    // Use the service to get information
    service = TestBed.get(ResumeService);
    const spy = jasmine.createSpy('spy');
    service.fetchProNetworks$().subscribe(spy);

    // Verify the returned data
    expect(spy).toHaveBeenCalledWith(socials);
    
    // verify that the service called with a proper endpoint
    expect(httpClient.get).toHaveBeenCalledWith(REST_API_SERVER.concat("/social_network"));
  });


});
