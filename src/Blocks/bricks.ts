import * as PIXI from "pixi.js";

export class Brick {
  private graphics: PIXI.Graphics;
  private pointValue: number = 0;

  constructor(private main: PIXI.Application, x: number, y: number) {
    this.graphics = new PIXI.Graphics();
    this.setRandomColor();
    this.graphics.drawRect(0, 0, 80, 20); 
    this.graphics.endFill();
    this.graphics.x = x;
    this.graphics.y = y;

    main.stage.addChild(this.graphics);
  }

  private setRandomColor(): void {
    const colors = ['red', 'blue', 'green']; 
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    this.graphics.beginFill(randomColor);

    switch (randomIndex) {
      case 0: 
        this.pointValue = 1;
        break;
      case 1: 
        this.pointValue = 2;
        break;
      case 2:
        this.pointValue = 3;
        break;
    }
  }

  public getBounds(): PIXI.Rectangle {
    return this.graphics.getBounds();
  }

  public destroy(): void {
    this.main.stage.removeChild(this.graphics);
  }

  public getPointValue(): number {
    return this.pointValue;
  }
}