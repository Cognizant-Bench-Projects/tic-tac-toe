import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor() { }

  nextStep(currentBoardState: Array<number>) {
    let random;
    do {
      random = Math.floor(Math.random() * 10);
    } while (currentBoardState[random] !== 0);
    return random;
  }
}
