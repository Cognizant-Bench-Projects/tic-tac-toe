import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameLogicService } from '../services/game-logic.service';
import { AiService } from '../services/ai.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild('msgModal', {static: false}) modalContent: TemplateRef<any>;
  boardPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  winner: number;
  showMsgModal: boolean = false;

  constructor(private gameState: GameStateService, private gameLogic: GameLogicService, private AIService: AiService, private modal: NgbModal) { }

  ngOnInit() {
    this.gameState.computerGoFirstEmitter().subscribe(() => {
      this.computerTurn();
    });

    this.gameState.startMsgEmitter().subscribe(showMsg => {
      this.showMsgModal = showMsg;
      setTimeout(() => {
        this.showMsgModal = false;
      }, 1000);
    })
  }

  clickOnBoard(idx) {
    if (this.gameState.boardState[idx] === 0 && !this.gameState.gameOver && !this.showMsgModal && (this.gameState.isPVP || (!this.gameState.isPVP && this.gameState.currentPlayer))) {
      this.gameState.boardState[idx] = this.gameState.currentPlayer ? 1 : 2;
      this.gameState.currentPlayer = !this.gameState.currentPlayer;
      this.gameState.click--;
      this.checkIfWin(idx);

      if (!this.gameState.isPVP && !this.gameState.gameOver) {
        this.computerTurn();
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
    this.modal.open(this.modalContent, {size: 'lg', centered: true});
  }

  playAgain() {
    this.gameState.restart();
    this.modal.dismissAll();
  }

  computerTurn() {
    if (!this.gameState.currentPlayer) {
      this.gameState.click--;
      let idx = this.AIService.nextStep(this.gameState.boardState);
      this.gameState.boardState[idx] = 2;
      this.gameState.currentPlayer = true;

      this.checkIfWin(idx);
    }
  }

  checkIfWin(idx: number) {
    if (this.gameState.click < 5) {
      let result = this.gameLogic.checkForWinner(this.gameState.boardState, idx);
      let isWinner = result.length ? result[3] : 0;

      if (isWinner) {
        this.winner = isWinner;
        this.gameState.winnerRow = result.slice(0, 3);
        this.gameFinished();
      } else if (!this.gameState.click) {
        this.winner = 0;
        this.gameFinished();
      }
    }
  }
}
