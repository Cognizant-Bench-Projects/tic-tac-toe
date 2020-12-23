import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  winPattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

  constructor() { }

  nextStep(currentBoardState: Array<number>, lastStep: number, clickLeft: number) {
    
    let idx = null;
    if (lastStep !== null) this.winPattern = this.winPattern.filter(pattern => !pattern.includes(lastStep));

    if (currentBoardState[4] === 0) return 4;
    
    if (clickLeft < 6) idx = this.checkIfCanWin(currentBoardState);
    
    if (idx === null) idx = this.blockPlayer(currentBoardState, lastStep);

    if (idx === null && !this.winPattern.length) return currentBoardState.indexOf(0);

    if (idx === null) {
      let random = Math.floor(Math.random() * this.winPattern.length);
      let emptySpots = [];
      for (let i = 0; i < 3; i++) {
        let spot = this.winPattern[random][i];
        if (currentBoardState[spot] === 0) {
          emptySpots.push(spot);
        }
      }
      return emptySpots[Math.floor(Math.random() * emptySpots.length)];
    }

    return idx;
  }

  blockPlayer(currentBoardState: Array<number>, lastStep: number) {
    let next = null;
    if (lastStep % 3 === 0 && (currentBoardState[lastStep+1] === 1 || currentBoardState[lastStep+2] === 1)) {
      next = currentBoardState[lastStep+1] === 1 ? lastStep + 2 : lastStep + 1;
      next = currentBoardState[next] ? null : next;
    }
    if (next === null && lastStep % 3 === 1 && (currentBoardState[lastStep+1] === 1 || currentBoardState[lastStep-1] === 1)) {
      next = currentBoardState[lastStep+1] === 1 ? lastStep - 1 : lastStep + 1;
      next = currentBoardState[next] ? null : next;
    }
    if (next === null && lastStep % 3 === 2 && (currentBoardState[lastStep-1] === 1 || currentBoardState[lastStep-2] === 1)) {
      next = currentBoardState[lastStep-1] === 1 ? lastStep - 2 : lastStep - 1;
      next = currentBoardState[next] ? null : next;
    }
    if (next === null && lastStep < 3 && (currentBoardState[lastStep+3] === 1 || currentBoardState[lastStep+6] === 1)) {
      next = currentBoardState[lastStep+3] === 1 ? lastStep + 6 : lastStep + 3;
      next = currentBoardState[next] ? null : next;
    }
    if (next === null && lastStep >= 3 && lastStep <= 5 && (currentBoardState[lastStep-3] === 1 || currentBoardState[lastStep+3] === 1)) {
      next = currentBoardState[lastStep-3] === 1 ? lastStep + 3 : lastStep - 3;
      next = currentBoardState[next] ? null : next;
    }
    if (next === null && lastStep > 5 && (currentBoardState[lastStep-3] === 1 || currentBoardState[lastStep-6] === 1)) {
      next = currentBoardState[lastStep-3] === 1 ? lastStep - 6 : lastStep - 3;
      next = currentBoardState[next] ? null : next;
    }
    if (next === null && lastStep % 4 === 0 && (currentBoardState[0] === 1 || currentBoardState[8] === 1)) {
      next = currentBoardState[4] === 2 ? null : currentBoardState[0] === 1 ? 8 : 0;
      next = currentBoardState[next] ? null : next;
    }
    if (next === null && lastStep % 2 === 0 && (currentBoardState[2] === 1 || currentBoardState[6] === 1)) {
      next = currentBoardState[4] === 2 ? null : currentBoardState[2] === 1 ? 6 : 2;
      next = currentBoardState[next] ? null : next;
    }
    return next;
  }
  
  checkIfCanWin(currentBoardState: Array<number>) {
    for (let i = 0; i < this.winPattern.length; i++) {
      let count = 0;
      let pattern = this.winPattern[i];
      
      for (let j = 0; j < 3; j++) {
        if (currentBoardState[pattern[j]] === 2) count++;
      }

      if (count === 2) {
        for (let k = 0; k < 3; k++) {
          if (currentBoardState[pattern[k]] === 0) return pattern[k];
        }
      }
    }
    return null;
  }
}
