import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../model/authUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authenticationFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const token = window.location.href.match(/token=(.*)/) && window.location.href.match(/token=(.*)/)[1];

    if (token) {
      try {
        let decodedJwt = new AuthUser();
        decodedJwt = jwt_decode(token);
        this.authService.setUser(decodedJwt);
        this.router.navigate(['./play-tic-tac-toe']);
      } catch (error) {
        this.authenticationFailed = true;
      }
    } else {
      this.authenticationFailed = true;
    }
  }

}
