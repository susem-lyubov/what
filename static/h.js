let correctAnswer = "";

//Get a question
function newQuestion() {
    let level = document.getElementById("level").value;

    fetch(`/api/question/${level}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("questionText").innerText =
                "Translate: " + data.prompt;

            correctAnswer = data.correct_answer;
            document.getElementById("result").innerText = "";
            document.getElementById("answerInput").value = "";
        });
}

//Send the answer to the python file to be checked
function checkAnswer() {
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
                document.getElementById("result").innerText = "True";
                document.getElementById("result").style.color = "green";
            } else {
                document.getElementById("result").innerText = "False- correct answer = " + correctAnswer;
                document.getElementById("result").style.color = "red";
            }
        });
}