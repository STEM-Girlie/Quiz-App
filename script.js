const questions = [
  {
    Question: "What software company is headquartered in Redmond, Washington?",
    Answers: [
      { text: "Amazon", correct: false },
      { text: "Microsoft", correct: true },
      { text: "Sony", correct: false },
      { text: "EA Games", correct: false },
    ],
  },
  {
    Question:
      "What is a word, phrase, number, or other sequence of characters that reads the same backward as forward?",
    Answers: [
      { text: "Synonym", correct: false },
      { text: "Noun", correct: false },
      { text: "Antonym", correct: false },
      { text: "Palindrome", correct: true },
    ],
  },
  {
    Question: "What is the worlds largest retailer as of 2026?",
    Answers: [
      { text: "Asda", correct: false },
      { text: "Facebook Marketplace", correct: false },
      { text: "Walmart", correct: true },
      { text: "TK Maxx", correct: false },
    ],
  },
  {
    Question: "Which day of the week does the Jewish Sabbath begin?",
    Answers: [
      { text: "Friday", correct: true },
      { text: "Saturday", correct: false },
      { text: "Monday", correct: false },
      { text: "Thursday", correct: false },
    ],
  },
  {
    Question: "What phone company produced the 3310?",
    Answers: [
      { text: "Blackberry", correct: false },
      { text: "Nokia", correct: true },
      { text: "iPhone", correct: false },
      { text: "Sony Ericsson", correct: false },
    ],
  },
  {
    Question: "What company was initially known as Blue Ribbon Sports?",
    Answers: [
      { text: "Fred Perry", correct: false },
      { text: "Adidas", correct: false },
      { text: "Nike", correct: true },
      { text: "Reebok", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.Question;

  currentQuestion.Answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
