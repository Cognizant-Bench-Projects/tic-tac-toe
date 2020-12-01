import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  url: string = 'http://localhost:8080/users';

  private user: User = null;

  constructor(private http: HttpClient) { }

  login(user: User) {
    this.http.post<User>(`${this.url}/login`, user).toPromise().then(
      data => {
        this.user = data;
        if (this.user) {
          this.closeModal.emit();
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
        console.error(error);
      }
    )
  }

  logout() {
    this.user = null;
  }

  closeModalEmitter() {
    return this.closeModal;
  }
}
