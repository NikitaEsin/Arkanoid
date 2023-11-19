import * as PIXI from "pixi.js";
import { Paddle } from "./Blocks/paddle";
import { Ball } from "./Blocks/ball";
import { Brick } from "./Blocks/bricks";
import { GameInterface } from "./Blocks/game";

export class Game implements GameInterface {
  private main: PIXI.Application;
  private paddle: Paddle;
  private ball: Ball;
  private bricks: Brick[] = [];
  private score: number = 0;
  private playerName: string;
  private scores: { playerName: string; score: number }[] = [];
  private promptShown: boolean = false;

  constructor(playerName: string) {
    this.main = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 'fff29c',
    });

    document.body.appendChild(this.main.view as unknown as Node);

    this.paddle = new Paddle(this.main);
    this.ball = new Ball(this.main, this);
    this.createBricks();
    this.playerName = playerName;
    this.updateScoreboard();

    this.main.ticker.add(this.update.bind(this));
  }

  private updateScoreboard(): void {
    const scoreBoard = document.getElementById("scoreBoard") as HTMLElement;
    scoreBoard.innerHTML = "<h3>Top 5 Players</h3>";

    // Sort scores in descending order
    this.scores.sort((a, b) => b.score - a.score);

    // Display top 5 scores
    const top5 = this.scores.slice(0, 5);
    top5.forEach((score, index) => {
      const playerInfo = document.createElement("p");
      playerInfo.textContent = `${index + 1}. ${score.playerName}: ${score.score}`;
      scoreBoard.appendChild(playerInfo);
    });
  }

  private saveScore(): void {
    this.scores.push({ playerName: this.playerName, score: this.score });
    this.updateScoreboard();
  }

  private createBricks(): void {
    const brickRows = 5;
    const brickCols = 8;
    const brickWidth = 80;
    const brickHeight = 20;

    for (let r = 0; r < brickRows; r++) {
      for (let c = 0; c < brickCols; c++) {
        const brickX = c * (brickWidth + 17) + 20; 
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
        this.score += brick.getPointValue();
        brick.destroy();
        this.bricks = this.bricks.filter((b) => b !== brick);
      }
    }
  }

  private update(): void {
    this.ball.move();
    this.handleTap();
    this.handleBrickTap();

    if (this.bricks.length === 0) {
      this.showPopup(true);
    }
  }

  private handleTap(): void {
    if (this.ball.checkPaddleTap(this.paddle)) {
      this.ball.bounce();
    }
  }

  public reset(): void {
    this.paddle.reset();
    this.ball.reset();
    this.resetBricks();
    this.score = 0;
  }

  private resetBricks(): void {
    this.bricks.forEach((brick) => brick.destroy());
    this.bricks = [];
    this.createBricks();
  }

  public showPopup(isWinner: boolean): void {
    this.promptShown = false; 
  
    const popup = document.getElementById("popup") as HTMLElement;
    const popupName = document.getElementById("popupName") as HTMLElement;
    const popupScore = document.getElementById("popupScore") as HTMLElement;
    const popupMessage = document.getElementById("popupMessage") as HTMLElement;
  
    popupName.textContent = `Player: ${this.playerName}`;
    popupScore.textContent = `Score: ${this.score}`;
    popupMessage.textContent = isWinner ? "Congratulations! You won!" : "Game over!";
  
    popup.classList.remove("hidden");
    popup.classList.add("popup");
  
    this.saveScore();
    this.main.ticker.stop();
  
    const continueButton = document.getElementById("continueButton") as HTMLButtonElement;
    continueButton.addEventListener("click", () => {
      this.main.ticker.start();
      popup.classList.add("hidden");
      popup.classList.remove("popup");
      this.reset();
  
      if (!this.promptShown) {
        this.promptForNewName();
        this.promptShown = true;
      }
    });
  }
  
  
  private promptForNewName(): void {
    const newName = prompt("Enter a new name to start a new game:");
  
    if (newName && newName.trim() !== "") {
      this.playerName = newName;
      this.startNewGame();
    } else {
      alert("Enter a valid name to start the game!");
      this.promptForNewName(); 
    }
  }
  
  private startNewGame(): void {
    this.promptShown = false; 
    this.reset();
  }
  
  
}