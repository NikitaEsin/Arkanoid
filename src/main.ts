import * as PIXI from "pixi.js";
import { Paddle } from "./Blox/paddle";
import { Ball } from "./Blox/ball";
import { Brick } from "./Blox/brick";
import { GameInterface } from "./Blox/game";

// Main class that manages the game
export class Game implements GameInterface {
  private main: PIXI.Application;
  private paddle: Paddle;
  private ball: Ball;
  private bricks: Brick[] = [];

  constructor() {
    // Create PIXI main
    this.main = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 'fff29c',
    });

    document.body.appendChild(this.main.view as unknown as Node);

    // Init paddle, bricks and ball
    this.paddle = new Paddle(this.main);
    this.ball = new Ball(this.main, this);
    this.createBricks();

    // Add update function to PIXI ticker
    this.main.ticker.add(this.update.bind(this));
  }

  // Create bricks
  private createBricks(): void {
    const brickRows = 5;
    const brickCols = 8;
    const brickWidth = 80;
    const brickHeight = 20;

    for (let r = 0; r < brickRows; r++) {
      for (let c = 0; c < brickCols; c++) {
        const brickX = c * (brickWidth + 15) + 20; // 15 is the gap between bricks
        const brickY = r * (brickHeight + 15) + 50;

        const brick = new Brick(this.main, brickX, brickY);
        this.bricks.push(brick);
      }
    }
  }

  private handleBrickTap(): void {
    for (const brick of this.bricks) {
      if (this.ball.checkBrickTap(brick)) {
        this.ball.bounce();
        brick.destroy();
        this.bricks = this.bricks.filter((b) => b !== brick);
      }
    }
  }

  // Game update function called on each frame
  private update(): void {
    this.ball.move();
    this.handleTap();
    this.handleBrickTap();
  }

  // Handle ball and paddle touch
  private handleTap(): void {
    if (this.ball.checkPaddleTap(this.paddle)) {
      this.ball.bounce();
    }
  }

  // Reset the entire game
  public reset(): void {
    this.paddle.reset();
    this.ball.reset();
    this.resetBricks();
  }

  // Reset bricks to initial position
  private resetBricks(): void {
    this.bricks.forEach((brick) => brick.destroy());
    this.bricks = [];
    this.createBricks();
  }
}

const game = new Game();