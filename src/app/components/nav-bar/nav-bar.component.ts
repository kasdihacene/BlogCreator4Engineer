import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isUserAuthenticated: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
  }

  onLogOut() {
    this.authService.removeToken();
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
    return this.router.navigate(['azul']);
  }

}
