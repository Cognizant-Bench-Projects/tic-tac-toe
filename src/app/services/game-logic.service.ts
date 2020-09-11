import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameLogicService {

  constructor() { }

  checkForWinner(boardState: Array<number>, idx: number) {
    let current = boardState[idx];

    if (idx % 3 === 0 && boardState[idx+1] === current && boardState[idx+2] === current) {
      return [idx, idx+1, idx+2, current];
    }
    if (idx % 3 === 1 && boardState[idx+1] === current && boardState[idx-1] === current) {
      return [idx-1, idx, idx+1, current];
    }
    if (idx % 3 === 2 && boardState[idx-1] === current && boardState[idx-2] === current) {
      return [idx-2, idx-1, idx, current];
    }
    if (idx < 3 && boardState[idx+3] === current && boardState[idx+6] === current) {
      return [idx, idx+3, idx+6, current];
    }
    if (idx >= 3 && idx <= 5 && boardState[idx-3] === current && boardState[idx+3] === current) {
      return [idx-3, idx, idx+3, current];
    }
    if (idx > 5 && boardState[idx-3] === current && boardState[idx-6] === current) {
      return [idx, idx-3, idx-6, current];
    }
    if (idx % 4 === 0 && current === boardState[0] && current === boardState[4] && current === boardState[8]) {
      return [0, 4, 8, current];
    }
    if (idx % 2 === 0 && current === boardState[2] && current === boardState[4] && current === boardState[6]) {
      return [2, 4, 6, current];
    }
    return [];
  }
}

// 0 1 2
// 3 4 5
// 6 7 8
// 0 3 6
// 1 4 7
// 2 5 8
// 0 4 8
// 2 4 6