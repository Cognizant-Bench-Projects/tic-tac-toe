import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { AuthService } from '../services/auth.service';
import { GithubUser } from '../model/githubUser';
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
        let decodedJwt = new GithubUser();
        decodedJwt = jwt_decode(token);
        localStorage.setItem("accessToken", token);
        this.authService.setUser(decodedJwt);
        this.router.navigate(['./play-tic-tac-toe']);
      } catch (error) {
        this.authenticationFailed = true;
      }
    }
  }

}
