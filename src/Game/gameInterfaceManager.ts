import * as PIXI from "pixi.js";

export class GameInterfaceManager {
    private startButtonCallback: () => void;
  
    constructor() {
      this.startButtonCallback = () => {}; 
  
      const startGameButton = document.getElementById("startGameButton");
      if (startGameButton) {
        startGameButton.addEventListener("click", () => {
          const playerNameInput = document.getElementById(
            "playerName"
          ) as HTMLInputElement;
          const playerName = playerNameInput.value;
  
          if (playerName.trim() !== "") {
            this.startButtonCallback(); 
          } else {
            alert("Enter your name before starting the game!");
          }
        });
      }
    }
  
    public onStartButtonClick(callback: () => void): void {
      this.startButtonCallback = callback;
    }
  
  }
  