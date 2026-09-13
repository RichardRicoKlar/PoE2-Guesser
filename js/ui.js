import {
    evaluateAnswer,
    startGame,
    loadAnswers,
    scoreCurrent,
    scoreAdd,
    scoreReset
} from "./game.js";

import {
    restartButton
} from "./controls.js";

const gameModesContainer = document.getElementById("game-mode-selector");
const gameModes = document.getElementById("game-mode");

const gameOptionsContainer = document.getElementById("optionsContainer");

const gameWrap = document.getElementById("gameWrap");
const gameContainer = document.getElementById("gameContainer");
const scoreContainer = document.getElementById("scoreContainer");
const scoreCounter = document.getElementById("scoreCounter");

const gameOverContainer = document.getElementById("game-over");

export function populateGameModes() {
    gameModes.innerHTML = "";

    renderGameOverScreen();
    gameOverContainer.style.display = "none";

    const btn = document.createElement("button");
    btn.textContent = "Start";

    btn.addEventListener("click", () => {
        btn.classList.add("active");
        renderGame();
    });

    gameModes.appendChild(btn);
}

export function renderGameOverScreen() {
    const btn = restartButton();

    gameOverContainer.appendChild(btn);
}

export function renderGame() {
    scoreReset();

    gameModesContainer.style.display = "none";

    renderGameOptions();

    gameWrap.style.display = "flex";
    gameContainer.innerHTML = "";

    const question = startGame();

    // Image
    const image = document.createElement("img");
    image.src = question.image;
    image.height = 85;
    gameContainer.appendChild(image);

    // Answer selector
    const selector = document.createElement("select");
    generateAnswers(selector);
    gameContainer.appendChild(selector);

    // Go button
    generateAnswerButton(gameContainer, selector);

    // Scoring
    updateScore();
}

export function updateScore() {
    scoreCounter.textContent = scoreCurrent();
}

function showNextQuestion() {
    const question = startGame();

    const image = document.querySelector("#gameContainer img");
    image.src = question.image;
}

export function renderGameOptions(){
    gameOptionsContainer.style.display = "flex";
    gameOptionsContainer.innerHTML = "";

    const btnRestart = restartButton();

    gameOptionsContainer.appendChild(btnRestart)
}

export function restartGame() {
    gameOverContainer.style.display = "none";
    renderGame();
}

export function generateAnswers(selector) {
    const answers = loadAnswers();

    answers.forEach(answer => {
        const option = document.createElement("option");

        option.value = answer;
        option.textContent = answer;

        selector.appendChild(option);
    });
}

export function generateAnswerButton(gameContainer, selector){
    const btnImage = document.createElement("img");
    btnImage.src = "images/misc/send.png";
    btnImage.alt = "Icon";

    const sendButton = document.createElement("button");
    sendButton.prepend(btnImage);

    sendButton.addEventListener("click", () => {
        const decision = evaluateAnswer(selector.value)

        if (decision){
            generateCorrect();
        }
        else gameOver();
    });

    gameContainer.appendChild(sendButton);
}

export function generateCorrect() {
    scoreAdd();
    updateScore();
    showNextQuestion();
}

export function gameOver() {
    gameWrap.style.display = "none";
    gameOptionsContainer.style.display = "none";
    gameOverContainer.style.display = "block";
}