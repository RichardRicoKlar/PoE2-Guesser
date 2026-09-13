let questions = [];
let currentQuestion = null;
let score = 0;

export async function loadQuestions() {
    try {
        const response = await fetch("data/skillgems.json");

        if (!response.ok) {
            throw new Error(`Failed to load questions: ${response.status}`);
        }

        questions = await response.json();

        console.log("Questions loaded:", questions);
    } catch (error) {
        console.error("Failed to load questions:", error);
    }
}

export function loadAnswers() {
    return questions.map(question => question.answer);
}

export function startGame() {
    const randomIndex = Math.floor(Math.random() * questions.length);

    currentQuestion = questions[randomIndex];

    return currentQuestion;
}

export function evaluateAnswer(selectedAnswer) {
    return selectedAnswer === currentQuestion.answer;
}

export function scoreCurrent(){
    return score;
}

export function scoreAdd(){
    score++;
}

export function scoreReset(){
    score = 0;
}