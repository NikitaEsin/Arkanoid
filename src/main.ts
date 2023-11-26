import { Game } from "./game/Game";
import { GameInterfaceManager } from "./Game/gameInterfaceManager";

document.addEventListener("DOMContentLoaded", () => {
  const gameInterfaceManager = new GameInterfaceManager();

  gameInterfaceManager.onStartButtonClick(() => {
    const playerNameInput = document.getElementById(
      "playerName"
    ) as HTMLInputElement;
    const playerName = playerNameInput.value;

    const game = new Game(playerName);

    const nameContainer = document.querySelector(".container");
    nameContainer?.classList.add("hidden");
  });
});
