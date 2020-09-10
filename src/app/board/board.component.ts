import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild('msgModal', {static: false}) modalContent: TemplateRef<any>;
  boardPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  winner: number;

  constructor(private gameState: GameStateService, private modal: NgbModal) { }

  ngOnInit() {
    setTimeout(() => {
      this.winner = 2;
      this.modal.open(this.modalContent);
    }, 300)
  }

  clickOnBoard(number) {
    if (this.gameState.boardState[number] === 0 && this.gameState.gameOver === false) {
      this.gameState.boardState[number] = this.gameState.currentPlayer ? 1 : 2;
      this.gameState.currentPlayer = !this.gameState.currentPlayer;
      this.gameState.click--;
      
      if (0) {
        // game logic
        this.winner = 1;
        this.gameFinished();
      } else if (!this.gameState.click) {
        this.winner = 2;
        this.gameFinished();
      }
    }
  }

  addScore(winner: number) {
    if (winner === 1) {
      this.gameState.score.player1++;
    } else if (winner === 2) {
      this.gameState.score.player2++;
    } else {
      this.gameState.score.tie++;
    }
  }

  gameFinished() {
    this.addScore(this.winner);
    this.gameState.gameOver = true;
    this.modal.open(this.modalContent);
  }

  playAgain() {
    this.gameState.restart();
    this.modal.dismissAll();
  }
}
