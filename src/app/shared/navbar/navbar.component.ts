import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isAuth: boolean = false;

  constructor(private _authService: AuthService) {
    this._authService.authStatus.subscribe(value => {
      this.isAuth = value;
    });
  }

  logout() {
    this._authService.logout()
  }
}
