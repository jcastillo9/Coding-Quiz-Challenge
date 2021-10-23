var clearButton = document.querySelector("#clear-button");

  function printHighscores() {
  var finalScore = JSON.parse(localStorage.getItem("highscores")) || [];
  
  finalScore.forEach(function(score, i) {

    var addScore= document.createElement("li");
    addScore.textContent = i + 1 + "." + " " + score.initials + " - " + score.score;

    var displayScore = document.getElementById("highscores");
    displayScore.appendChild(addScore);
  });
}

function clearHighscores() {
  localStorage.removeItem("highscores");
  location.reload();
}

printHighscores();

clearButton.addEventListener("click", clearHighscores);