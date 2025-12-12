async function getQuestion() {
    const response = await fetch("/api/question/1");
    const data = await response.json();

    window.currentCorrect = data.correct_answer;

    document.getElementById("question").innerText = data.prompt;
}

async function checkAnswer() {
    let userInput = document.getElementById("answerInput").value;

    fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_answer: userInput,
            correct_answer: correctAnswer
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.correct) {
            newQuestion();

        } else {
            // User must keep trying
            document.getElementById("result").style.color = "red";
            document.getElementById("answerInput").value = "";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getQuestion();   // load first question automatically
});
