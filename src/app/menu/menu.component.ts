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

  constructor(private gameState: GameStateService, private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
    this.authService.closeModalEmitter().subscribe(() => {
      this.closeModal();
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

  login() {
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.currentInput) ? this.currentUser.email = this.currentInput : this.currentUser.username = this.currentInput;
    this.authService.login(this.currentUser);
  }

  signup() {
    this.authService.signup(this.currentUser);
  }

  logout() {
    this.authService.logout();
  }

  openModal(content) {
    this.currentUser = new User();
    this.currentInput = '';
    this.confirmPassword = '';
    this.modalService.open(content, { centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
