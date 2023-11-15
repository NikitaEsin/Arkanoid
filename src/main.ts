import * as PIXI from "pixi.js";
import { Paddle } from "./Blox/paddle";
import { Ball } from "./Blox/ball";

export class Game {
  private main: PIXI.Application;
  private paddle: Paddle;
  private ball: Ball;
  

  constructor() {
    this.main = new PIXI.Application({
      width: 750,
      height: 550,
      backgroundColor: 'fff29c',
    });

    document.body.appendChild(this.main.view as unknown as Node);

    this.paddle = new Paddle(this.main);
    this.ball = new Ball(this.main);

    
    this.main.ticker.add(this.update.bind(this));
  }
  private update(): void {
    this.ball.move();
    this.handleTap();
  }
  private handleTap(): void {
    if (this.ball.checkTap(this.paddle)) {
      this.ball.bounce();
    }
  }
}

const game = new Game();