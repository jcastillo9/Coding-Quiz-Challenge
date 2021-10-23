var currentTime = 75;
var questionIndex = 0;
var timeEl = document.querySelector("#time");
var homePage = document.querySelector("#home");
var startButton = document.querySelector("#start-button");
var submitButton = document.querySelector("#submit-button");
var quizPage = document.querySelector("#quiz-section");
var optionAns = document.querySelector("#multiple-choice");
var correctAns = document.querySelector("#answer");
var scorePage = document.querySelector("#score-section");
var initialsEl = document.querySelector("#initials");

var quizQuestions = [
    {
        title: "Commonly Used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statment is enclosed within _____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store _____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    }
]

function startQuiz() {
   
    homePage.setAttribute("class", "hidden");

    quizPage.setAttribute("class", "visible");
    
    scorePage.setAttribute("class", "hidden");

    timerId = setInterval(startTime, 1000);

    timeEl.textContent = "Time" + ":" + currentTime;

    beginQuiz();
}

function startTime() {
    currentTime--;
    timeEl.textContent = "Time" + ":" + currentTime;

    if (currentTime === 0) {
        endQuiz();
    }
}

function beginQuiz() {
    var currentQuestion =  quizQuestions[questionIndex];
  
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    optionAns.innerHTML = "";
  
    currentQuestion.choices.forEach(function(choice, i) {
     
        var ansButton = document.createElement("button");
        ansButton.setAttribute("class", "choice");
        ansButton.setAttribute("value", choice);
    
        ansButton.textContent = i + 1 + ". " + choice;
    
        ansButton.addEventListener("click", questionClick);
    
        optionAns.appendChild(ansButton);
      });
    }

function questionClick() {
    if(this.value !== quizQuestions[questionIndex].answer) {
        currentTime -= 15;
        if(currentTime < 0) {
            currentTime = 0;
        }

        timeEl.textContent = "Time" + ":" + currentTime;

        correctAns.textContent = "Wrong! \u274C";
    } else {

        correctAns.textContent = "Correct! \u2705";
    }

    correctAns.setAttribute("class", "correct");
    setTimeout(function () {
        correctAns.setAttribute("class", "correct hidden");
    }, 1000);

    questionIndex++;

    if (questionIndex === quizQuestions.length) {
        endQuiz();
    } else {
        beginQuiz();
        }
    }

function endQuiz() {
    clearInterval(timerId);

    scorePage.setAttribute("class", "visible");

    var finalScoreEl = document.querySelector("#final-score")
    finalScoreEl.textContent = currentTime;
    
    quizPage.setAttribute("class", "hidden");
}

function submitHighscore() {
    var userInitials = initialsEl.value;

    if(userInitials !== "") {
        var highscores = 
        JSON.parse(localStorage.getItem("highscores")) || [];
        
        var newScore = {
            score: currentTime,
            initials: userInitials
        };

        highscores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highscores)) || [];

        location.href = "highScore.html";
    }
}
submitButton.addEventListener("click", submitHighscore);
startButton.addEventListener("click", beginQuiz);