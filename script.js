const questions = [
  "Do you often feel nervous, restless, or on edge?",
  "Excessive worrying or difficulty controlling worry",
  "Feeling irritable or easily annoyed",
  "Persistent sense of impending danger or doom",
  "Rapid heartbeat, palpitations, or chest discomfort",
  "Difficulty breathing or shortness of breath",
  "Feeling dizzy, shaky, or trembling",
  "Muscle tension or unexplained aches and pains",
  "Trouble falling asleep or staying asleep due to anxiety",
  "Avoidance of situations due to anxiety"
];

const answers = ["Never", "Rarely", "Sometimes", "Frequently", "Always"];

let currentQuestionIndex = 0;
let totalScore = 0;

const quizContainer = document.getElementById('quiz');
const progressText = document.getElementById('progress');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

const userAnswers = [];

function showQuestion(index) {
  const currentQuestion = questions[index];
  progress.textContent = `Question ${index + 1} of ${questions.length}`;

  quiz.innerHTML = `
    <div class="question">
      <p>${currentQuestion}</p>
      ${answers.map((option, val) => `
        <label>
          <input type="radio" name="answer" value="${val}">
          ${option}
        </label><br>
      `).join('')}
    `;
}

function showResults() {
  let totalScore = userAnswers.reduce((sum, value) => sum + parseInt(value), 0);
  let anxietyLevel, recommendation;

  if (totalScore <= 10) {
    anxietyLevel = "Mild Anxiety";
    recommendation = "Consider basic relaxation techniques and read some of our articles on managing stress.";
  } else if (totalScore <= 24) {
    anxietyLevel = "Moderate Anxiety";
    recommendation = "Explore self-help resources, guided exercises, and anxiety tracking journals.";
  } else {
    anxietyLevel = "Severe Anxiety";
    recommendation = "We strongly recommend consulting a mental health professional. Explore counseling resources for immediate help.";
  }

  resultsContainer.innerHTML = `
    <h3>Your Anxiety Level: ${anxietyLevel}</h3>
    <p>${recommendation}</p>
  `;

  quiz.innerHTML = '';
  progress.textContent = "Quiz Complete!";
  submitButton.style.display = 'none';
}

let currentQuestionIndex = 0;

submitButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[type=radio]:checked');
  
  if (!selectedOption) {
    alert("Please select an option to continue.");
    return;
  }

  userAnswers.push(selectedOption.value);

  if (userAnswers.length < questions.length) {
    showQuestion(userAnswers.length);
  } else {
    submitButton.style.display = 'none';
    progress.style.display = 'none';
    quiz.style.display = 'none';
    showResults();
  }
}

const answers = ["0", "1", "2", "3", "4"];

showQuestion(0);
