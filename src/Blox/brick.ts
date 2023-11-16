import * as PIXI from "pixi.js";

// Brick class
export class Brick {
    private graphics: PIXI.Graphics;
  
    constructor(private main: PIXI.Application, x: number, y: number) {
      this.graphics = new PIXI.Graphics();
      this.setRandomColor();
      this.graphics.drawRect(0, 0, 80, 20); // Set the size of the brick
      this.graphics.endFill();
      this.graphics.x = x;
      this.graphics.y = y;
  
      main.stage.addChild(this.graphics);
    }
  
    // Set random color for the brick
    private setRandomColor(): void {
      const colors = [0xff0000, 0x0000ff, 0x00ff00];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      this.graphics.beginFill(randomColor);
    }
  
    // Get the bounds of the brick to check collision
    public getBounds(): PIXI.Rectangle {
      return this.graphics.getBounds();
    }
  
    // Remove the brick from the stage
    public destroy(): void {
      this.main.stage.removeChild(this.graphics);
    }
  }