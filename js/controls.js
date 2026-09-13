import { restartGame } from "./ui.js";

export function restartButton(){
        const btnRestart = document.createElement("button");
        btnRestart.textContent = "Restart";

        btnRestart.addEventListener("click", () =>{
            restartGame();
        })

        return btnRestart;
}