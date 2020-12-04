import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { AuthUser } from '../model/authUser';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginFailed: EventEmitter<any> = new EventEmitter<any>();
  @Output() emailNotUnique: EventEmitter<any> = new EventEmitter<any>();
  @Output() usernameNotUnique: EventEmitter<any> = new EventEmitter<any>();

  url: string = 'http://localhost:8080/users';

  private user: User = null;

  constructor(private http: HttpClient) { }

  login(user: User) {
    this.http.post<User>(`${this.url}/login`, user).toPromise().then(
      data => {
        this.user = data;
        if (this.user) {
          this.closeModal.emit();
        } else {
          this.loginFailed.emit();
        }
      }, error => {
        console.error(error);
      }
    )
  }

  signup(user: User) {
    this.http.post<User>(`${this.url}`, user).toPromise().then(
      data => {
        this.user = data;
        if (this.user) {
          this.closeModal.emit();
        }
      }, error => {
        if (error.error === 'Email already in use') {
          this.emailNotUnique.emit();
        }
        if (error.error === 'Username already in use') {
          this.usernameNotUnique.emit();
        }
      }
    )
  }

  setUser(user: AuthUser) {
    this.user = new User();
    this.user.id = user.id || null;
    this.user.username = user.login ? user.name : user.given_name;
    this.user.email = user.email || null;
  }

  logout() {
    this.user = null;
  }

  closeModalEmitter() {
    return this.closeModal;
  }

  loginFailedEmitter() {
    return this.loginFailed;
  }

  emailNotUniqueEmitter() {
    return this.emailNotUnique;
  }

  usernameNotUniqueEmitter() {
    return this.usernameNotUnique;
  }
}
