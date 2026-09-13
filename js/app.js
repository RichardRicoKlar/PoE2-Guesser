import { loadQuestions } from "./game.js";
import { populateGameModes } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
    await loadQuestions();

    populateGameModes();
});