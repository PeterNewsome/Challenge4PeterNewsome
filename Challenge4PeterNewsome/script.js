document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-button");
    const quiz = document.getElementById("quiz");
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const gameOver = document.getElementById("game-over");
    const finalScore = document.getElementById("final-score");
    const initialsInput = document.getElementById("initials");
    const submitScore = document.getElementById("submit-score");
  
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 75; // Set the initial timer value (in seconds)
    let timer;
  
    const questions = [
      {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correctAnswer: "4",
      },
      {
        question: "What is 3 + 5?",
        choices: ["6", "7", "8", "9"],
        correctAnswer: "8",
      },
      {
        question: "What is 6 - 2?",
        choices: ["2", "3", "4", "5"],
        correctAnswer: "4",
      },
    ];
  
    startButton.addEventListener("click", startQuiz);
  
    function startQuiz() {
      startButton.style.display = "none";
      quiz.classList.remove("hidden");
      timer = setInterval(updateTimer, 1000);
      displayQuestion();
    }
  
    function displayQuestion() {
      if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        choicesElement.innerHTML = "";
  
        currentQuestion.choices.forEach((choice) => {
          const choiceButton = document.createElement("button");
          choiceButton.textContent = choice;
          choiceButton.addEventListener("click", checkAnswer);
          choicesElement.appendChild(choiceButton);
        });
      } else {
        endQuiz();
      }
    }
  
    function checkAnswer(event) {
      const selectedChoice = event.target.textContent;
      const currentQuestion = questions[currentQuestionIndex];
  
      if (selectedChoice === currentQuestion.correctAnswer) {
        score++;
      } else {
        timeLeft -= 10;
      }
  
      currentQuestionIndex++;
      displayQuestion();
    }
  
    function updateTimer() {
      if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
        clearInterval(timer);
        endQuiz();
      } else {
        timeLeft--;
      }
    }
  
    function endQuiz() {
      quiz.classList.add("hidden");
      gameOver.classList.remove("hidden");
      finalScore.textContent = score;
    }
  
    submitScore.addEventListener("click", () => {
      const initials = initialsInput.value.trim();
      if (initials !== "") {
        const scoreData = {
          initials: initials,
          score: score,
        };
  
        let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push(scoreData);
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores(highScores);
      }
    });
  
    function displayHighScores(highScores) {
      const highScoresList = document.getElementById("high-scores-list");
      highScoresList.innerHTML = "";
      const heading = document.createElement("h2");
      heading.textContent = "High Scores";
      highScoresList.appendChild(heading);
      const ol = document.createElement("ol");
      highScores.forEach((scoreData, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${scoreData.initials}: ${scoreData.score}`;
        ol.appendChild(li);
      });
      highScoresList.appendChild(ol);
    }
  });