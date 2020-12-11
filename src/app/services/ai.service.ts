import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor() { }

  nextStep(currentBoardState: Array<number>, lastStep: number) {
    if (currentBoardState[4] === 0) {
      return 4;
    }
    let idx = this.next(currentBoardState, lastStep);
    if (idx === null) {
      do {
        idx = Math.floor(Math.random() * 10);
      } while (currentBoardState[idx] !== 0);
    }
    return idx;
  }

  next(currentBoardState: Array<number>, lastStep: number) {
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

}
