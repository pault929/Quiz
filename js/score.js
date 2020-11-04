// code 

function printHighscores() {
    // either get scores from local storage or set to empty array
    highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
  
    // for each score
    highScores.forEach(function(highScores) {
      // create li tag for each high score
      var liTag = document.createElement("li");
      liTag.textContent = highScores.initials + " " + highScores.userScore;
      // display on page
      var olEl = document.getElementById("highscores");
      olEl.append(liTag);
    });
  }
  
  function clearHighscores() {
    // variable to get the highscores element 
    var grabOl = document.getElementById("highscores");
    //delete highscores from local storage
    window.localStorage.clear();
    // (and reload - stop displaying deleted highscores on page)
    while (grabOl.hasChildNodes()) {
      grabOl.removeChild(grabOl.firstChild);
    }
  }
  
  // attach clear event to clear score button
  document.getElementById("clear").addEventListener("click", clearHighscores)
  
  // run printhighscore when page loads
  printHighscores();