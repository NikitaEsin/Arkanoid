import * as PIXI from "pixi.js";

export class Paddle {
  private graphics: PIXI.Graphics;

  constructor(private main: PIXI.Application) {
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill('black');
    this.graphics.drawRect(0, 0, 100, 20);
    this.graphics.endFill();
    this.graphics.x = main.screen.width / 2 - this.graphics.width / 2;
    this.graphics.y = main.screen.height - 20;

    main.stage.addChild(this.graphics);
  }
  
  public getBounds(): PIXI.Rectangle {
    return this.graphics.getBounds();
  }
}