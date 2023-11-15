import * as PIXI from "pixi.js";
import { Paddle } from "./paddle";

export class Ball {
  private graphics: PIXI.Graphics;
  private speedX: number = 4;
  private speedY: number = 4;

  constructor(private main: PIXI.Application) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill('silver');
    this.graphics.drawCircle(0, 0, 15);
    this.graphics.endFill();
    this.graphics.x = main.screen.width / 2;
    this.graphics.y = main.screen.height - 60;

    main.stage.addChild(this.graphics);
  }

  public move(): void {
    this.graphics.x += this.speedX;
    this.graphics.y += this.speedY;

    if (this.graphics.x + this.graphics.width >= this.main.screen.width || this.graphics.x <= 0) {
      this.speedX = -this.speedX;
    }

    if (this.graphics.y <= 0 || this.graphics.y + this.graphics.height >= this.main.screen.height) {
      this.speedY = -this.speedY;
    }

    if (this.graphics.y + this.graphics.height >= this.main.screen.height) {
      this.reset();
    }
  }

  public bounce(): void {
    this.speedY = -this.speedY;
  }

  public checkTap(paddle: Paddle): boolean {
    const ballBounds = this.graphics.getBounds();
    const paddleBounds = paddle.getBounds();
    return (
      ballBounds.x + ballBounds.width >= paddleBounds.x &&
      ballBounds.x <= paddleBounds.x + paddleBounds.width &&
      ballBounds.y + ballBounds.height >= paddleBounds.y
    );
  }

  private reset(): void {
    this.graphics.x = this.main.screen.width / 2;
    this.graphics.y = this.main.screen.height - 60;
    this.speedX = 4;
    this.speedY = 4;
  }
}