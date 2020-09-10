import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  gameStarted: boolean = false;
  isPVP: boolean;
  currentPlayer: boolean = true;
  click: number = 9;
  gameOver: boolean = false;

  boardState: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  score = {
    player1: 0,
    tie: 0,
    player2: 0
  };

  constructor() { }

  restart() {
    this.boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.click = 9;
    this.currentPlayer = true;
    this.gameOver = false;
  }
}
