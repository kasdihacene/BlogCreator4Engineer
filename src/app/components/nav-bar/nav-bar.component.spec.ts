import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [ 
        { provide: AuthService, useClass: AuthService}
      ],
        declarations: [ NavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
