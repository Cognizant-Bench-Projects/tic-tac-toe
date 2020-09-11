import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private gameState: GameStateService) { }

  ngOnInit() {
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
}
