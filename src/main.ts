import { Game } from "./game/Game";

document.addEventListener("DOMContentLoaded", () => {
  const startGameButton = document.getElementById("startGameButton");
  if (startGameButton) {
    startGameButton.addEventListener("click", () => {
      const playerNameInput = document.getElementById(
        "playerName"
      ) as HTMLInputElement;
      const playerName = playerNameInput.value;

      if (playerName.trim() !== "") {
        const game = new Game(playerName);

        const nameContainer = document.querySelector(".container");
        nameContainer?.classList.add("hidden");
      } else {
        alert("Enter your name before starting the game!");
      }
    });
  }
});
