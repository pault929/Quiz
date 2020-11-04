// variables to keep track of quiz state
var currentQuestionIndex = 0;
var timerId = 75;
var currentQuestion;
var userScore = 0;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
// my additional variables to reference DOM elements
var startScreenEl = document.getElementById("start-screen");
var questionTitleEl = document.getElementById("question-title");
var endScreenEl = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");


function startQuiz() {
  // hide start screen
  startScreenEl.className = "hide";
  // un-hide questions section
  questionsEl.className = "start";
  // start timer
  function myTimer() {
  // show starting time
  timerEl.innerHTML = `${timerId}`;
  timerId--;
  // prevent negative time
  timerId = timerId < 0 ? 0 : timerId;
  // end quiz if time runs out
  if (timerId === 0) {
    quizEnd();
  }
  }
  setInterval(myTimer, 1000);
  getQuestion();
};


function getQuestion() {
  // get current question object from array
  currentQuestion = questions[currentQuestionIndex];
  // update title with current question
  questionTitleEl.textContent = currentQuestion.title;
  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {

  // create new button for each choice
  var choiceBtn = document.createElement("button");
  choiceBtn.textContent = currentQuestion.choices[i];

  // attach click event listener to each choice
  choiceBtn.addEventListener("click", function(e){
    questionClick(e)
  });

  // display on the page
  choicesEl.appendChild(choiceBtn);
  }
}

function questionClick(event) {
  // check if user guessed correctly
  if (event.target.textContent === questions[currentQuestionIndex].answer) {
    // userScore = userScore + 10;
    userScore +=10;
    // play "right" sound effect
    sfxRight.play();
    feedbackEl.textContent = "Correct!";
  }
  // else
    else {
      // penalize time
      timerId -=10;
      // display new time on page
      timerEl.textContent = timerId;
      // play "wrong" sound effect
      sfxWrong.play();
      feedbackEl.textContent = "Wrong!";
    }
  
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;
  // check if we've run out of questions
  if (currentQuestionIndex > questions.length - 1) {
    // quizEnd
    quizEnd();
    // else
  } else {
    // getQuestion
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  timerId = 0;
  // show final score
  finalScoreEl.textContent = userScore;
  // hide questions section
  questionsEl.className = "hide";
  // show end screen
  endScreenEl.className = "start";
}

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value;
    // make sure value wasn't empty
    if (initials === "") {
      alert("Please leave your initials");
    } else {
    // get saved scores from localstorage, or if not any, set to empty array
    var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];

    // new score object for user
    var latestScore = {
      userScore: userScore,
      initials: initials,
    }
    console.log(latestScore);

    //save to local storage
    highScores.push(latestScore);
    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    // show the highscores page
    window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
  // check if event key is enter
  if (event.keyCode == 13) {
    // saveHighscore
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

//user can click enter to submit initials
initialsEl.onkeyup = checkForEnter;