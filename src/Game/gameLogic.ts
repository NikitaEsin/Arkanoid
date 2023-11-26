import { Ball } from "../Blocks/ball";
import { Paddle } from "../Blocks/paddle";
import { Brick } from "../Blocks/bricks";
import { Game } from "./Game";

export class GameLogic {
  private ball: Ball;
  private paddle: Paddle;
  private bricks: Brick[];
  private score: number;

  constructor(private game: Game) {
    this.ball = game.getBall();
    this.paddle = game.getPaddle();
    this.bricks = game.getBricks();
    this.score = game.getScore();
  }

  public update(): void {
    this.ball.move();
    this.handleTap();
    this.handleBrickTap();

    if (this.bricks.length === 0) {
      this.game.showPopup(true);
    }
  }

  private handleTap(): void {
    if (this.ball.checkPaddleTap(this.paddle)) {
      this.ball.bounce();
    }
  }

  private handleBrickTap(): void {
    for (const brick of this.bricks) {
      if (this.ball.checkBrickTap(brick)) {
        this.ball.bounce();
        this.score += brick.getPointValue();
        brick.destroy();
        this.bricks = this.bricks.filter((b) => b !== brick);
      }
    }
  }
}
