import * as PIXI from "pixi.js";

export class Paddle {
  private graphics: PIXI.Graphics;

  constructor(private main: PIXI.Application) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill('black');
    this.graphics.drawRect(0, 0, 120, 20);
    this.graphics.endFill();
    this.graphics.x = main.screen.width / 2 - this.graphics.width / 2;
    this.graphics.y = main.screen.height - 20;

    main.stage.addChild(this.graphics);
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  public moveLeft(): void {
    if (this.graphics.x > 0) {
      this.graphics.x -= 50;
    }
  }

  public moveRight(): void {
    if (this.graphics.x < this.main.screen.width - this.graphics.width) {
      this.graphics.x += 50;
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowLeft": {
        this.moveLeft();
        break;
      }
      case "ArrowRight": {
        this.moveRight();
        break;
      }
    }
  }

  public reset(): void {
    this.graphics.x = this.main.screen.width / 2 - this.graphics.width / 2;
    this.graphics.y = this.main.screen.height - 20;
  }

  public getBounds(): PIXI.Rectangle {
    return this.graphics.getBounds();
  }
}