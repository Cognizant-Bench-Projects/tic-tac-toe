import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  gameStarted: boolean = false;
  isPVP: boolean;
  currentPlayer: boolean = true;
  click: number = 9;
  gameOver: boolean = false;
  winnerRow: Array<number> = [];

  boardState: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  score = {
    player1: 0,
    tie: 0,
    player2: 0
  };

  @Output() computerGo: EventEmitter<any> = new EventEmitter<any>();
  @Output() msgModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  restart() {
    this.clean();
    this.showStartMsg();
    if (!this.currentPlayer && !this.isPVP) {
      setTimeout(() => {
        this.computerGo.emit();
      }, 1000);
    }
  }

  showStartMsg() {
    if (this.gameStarted) {
      this.msgModal.emit(true);
    }
  }

  clean() {
    this.boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.winnerRow = [];
    this.click = 9;
    this.gameOver = false;
    this.currentPlayer = (this.score.player1 + this.score.player2 + this.score.tie) % 2 === 0;
  }

  computerGoFirstEmitter() {
    return this.computerGo;
  }

  startMsgEmitter() {
    return this.msgModal;
  }
}
