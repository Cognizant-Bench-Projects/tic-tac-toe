import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { GameStateService } from '../services/game-state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser: User = new User();
  currentInput: string = '';
  confirmPassword: string = '';

  loginFailed: boolean = false;
  invalidUsername: boolean = false;
  usernameNotUnique: boolean = false;
  invalidEmail: boolean = false;
  emailNotUnique: boolean = false;
  invalidPassword: boolean = false;
  passwordNotMatch: boolean = false;

  constructor(private gameState: GameStateService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.authService.closeModalEmitter().subscribe(() => {
      this.closeModal();
    })

    this.authService.loginFailedEmitter().subscribe(() => {
      this.loginFailed = true;
    })

    this.authService.usernameNotUniqueEmitter().subscribe(() => {
      this.usernameNotUnique = true;
    })

    this.authService.emailNotUniqueEmitter().subscribe(() => {
      this.emailNotUnique = true;
    })
  }

  startGame(player: boolean) {
    this.gameState.isPVP = player;
    this.gameState.gameStarted = true;
    this.gameState.showStartMsg();
  }

  reset() {
    this.gameState.score = {
      player1: 0,
      tie: 0,
      player2: 0
    };
    this.gameState.clean();
    this.gameState.showStartMsg();
  }
 
  backToMenu() {
    this.gameState.gameStarted = false;
    this.reset();
  }

  validateInput() {
    this.invalidUsername = this.currentUser.username.length < 5 || this.currentUser.username.length > 10 || this.currentUser.username.includes('@');
    this.invalidEmail = !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.currentUser.email);
    this.invalidPassword = this.currentUser.password.length < 8 || this.currentUser.password.length > 16;
    this.passwordNotMatch = this.confirmPassword !== this.currentUser.password;

    if (this.invalidUsername || this.invalidEmail || this.invalidPassword || this.passwordNotMatch) {
      return false;
    }
    return true;
  }

  login() {
    this.currentInput.includes('@') ? this.currentUser.email = this.currentInput : this.currentUser.username = this.currentInput;
    this.authService.login(this.currentUser);
  }

  signup() {
    if (this.validateInput()) {
      this.usernameNotUnique = false;
      this.emailNotUnique = false;
      this.authService.signup(this.currentUser);
    }
  }

  logout() {
    this.authService.logout();
  }

  openModal(content) {
    this.currentUser = new User();
    this.currentInput = '';
    this.confirmPassword = '';
    this.loginFailed = false;
    this.invalidUsername = false;
    this.usernameNotUnique = false;
    this.invalidEmail = false;
    this.emailNotUnique = false;
    this.invalidPassword = false;
    this.passwordNotMatch = false;
    this.modalService.open(content, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
