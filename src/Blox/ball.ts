import * as PIXI from "pixi.js";
import { Paddle } from "./paddle";
import { Brick } from "./brick";
import { GameInterface } from "../Blox/game";

// Ball class
export class Ball {
  private graphics: PIXI.Graphics;
  private speedX: number = 4;
  private speedY: number = -4;
  private game: GameInterface;

  constructor(private main: PIXI.Application, game: GameInterface) {
    this.game = game;
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill('silver');
    this.graphics.drawCircle(0, 0, 15);
    this.graphics.endFill();
    this.graphics.x = main.screen.width / 2;
    this.graphics.y = main.screen.height - 60;

    main.stage.addChild(this.graphics);
  }

  // Move the ball
  public move(): void {
    this.graphics.x += this.speedX;
    this.graphics.y += this.speedY;

    // Bounce x-axis
    if (
      this.graphics.x + this.graphics.width >= this.main.screen.width ||
      this.graphics.x <= 0
    ) {
      this.speedX = -this.speedX;
    }

    // Bounce y-axis
    if (this.graphics.y <= 0) {
      this.speedY = -this.speedY;
    }

    // Reset game if ball reaches floor
    if (this.graphics.y + this.graphics.height >= this.main.screen.height) {
      this.game.reset();
    }
  }

  // Invert Y speed
  public bounce(): void {
    this.speedY = -this.speedY;
  }

  // Check if paddle is touched
  public checkPaddleTap(paddle: Paddle): boolean {
    const ballBounds = this.graphics.getBounds();
    const paddleBounds = paddle.getBounds();
    return (
      ballBounds.x + ballBounds.width >= paddleBounds.x &&
      ballBounds.x <= paddleBounds.x + paddleBounds.width &&
      ballBounds.y + ballBounds.height >= paddleBounds.y
    );
  }

  // Check brick touch
  public checkBrickTap(brick: Brick): boolean {
    const ballBounds = this.graphics.getBounds();
    const brickBounds = brick.getBounds();
    return (
      ballBounds.x + ballBounds.width >= brickBounds.x &&
      ballBounds.x <= brickBounds.x + brickBounds.width &&
      ballBounds.y + ballBounds.height >= brickBounds.y &&
      ballBounds.y <= brickBounds.y + brickBounds.height
    );
  }

  // Reset ball
  public reset(): void {
    this.graphics.x = this.main.screen.width / 2;
    this.graphics.y = this.main.screen.height - 60;
    this.speedX = 4;
    this.speedY = -4;
  }
}