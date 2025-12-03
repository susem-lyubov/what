import json
import random
from flask import Flask, request, jsonify

app = Flask(__name__)
    
def loadLists(level):
    with open(f"{level}.json", encoding="utf-8") as wordList:
        return json.load(wordList)

words = {
    "1": loadLists("one"),
    "2": loadLists("two"),
    "3": loadLists("three")
}

@app.route("/api/question/<level>")
def getQuestion(level):
    terms = words[level]
    word = random.choice(terms)

    return jsonify({
        "prompt": word["en"],
        "correct_answer": word["kr"],
        "direction": "en_to_kr"
    })

@app.route("/api/check", methods=["POST"])
def checkAnswer():
    data = request.get_json()
    user = data["user_answer"].strip().lower()
    correct = data["correct_answer"].strip().lower()

    return jsonify({
        "correct": user == correct
    })

