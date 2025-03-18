const questions = [
  "Do you often feel nervous, restless, or on edge?",
  "Excessive worrying or difficulty controlling worry",
  "Feeling irritable or easily annoyed",
  "Persistent sense of impending danger or doom",
  "Rapid heartbeat, palpitations, or chest discomfort",
  "Difficulty breathing or shortness of breath",
  "Feeling dizzy, shaky, or trembling",
  "Muscle tension or unexplained aches and pains",
  "Trouble falling asleep or staying asleep",
  "Avoiding situations due to anxiety"
];

const answers = ["Never", "Rarely", "Sometimes", "Frequently", "Always"];

let currentQuestionIndex = 0;
const userResponses = [];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');
const progress = document.getElementById('progress');

function displayQuestion(index) {
  const currentQuestion = questions[index];
  quizContainer.innerHTML = `
    <div class="question">
      <p>${currentQuestion}</p>
      ${answers.map((answer, i) =>
        `<label>
          <input type="radio" name="question${index}" value="${i}">
          ${answer}
        </label><br>`
      ).join('')}
    `;
  progress.textContent = `Question ${index + 1} of ${questions.length}`;

  // Update button text dynamically
  submitButton.textContent = (index === questions.length - 1) ? "See Results" : "Next";
}

function calculateResults() {
  const totalScore = userResponses.reduce((total, current) => total + parseInt(current), 0);

  let anxietyLevel, recommendation;

  if (totalScore <= 10) {
    anxietyLevel = "Mild Anxiety";
    recommendation = "Consider practicing relaxation techniques and exploring our articles for managing stress.";
  } else if (totalScore <= 24) {
    anxietyLevel = "Moderate Anxiety";
    recommendation = "Explore self-help resources, guided relaxation exercises, and anxiety-tracking journals.";
  } else {
    anxietyLevel = "Severe Anxiety";
    recommendation = "We strongly recommend consulting a mental health professional. Consider professional counseling or immediate anxiety relief resources.";
  }

  resultsContainer.innerHTML = `
    <h3>Your Anxiety Level: ${anxietyLevel}</h3>
    <p>${recommendation}</p>
  `;

  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  progress.style.display = 'none';
}

submitButton.addEventListener('click', () => {
  const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
  
  if (!selectedOption) {
    alert("Please select an answer before continuing.");
    return;
  }

  userResponses.push(selectedOption.value);
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    calculateResults();
  }
});

// Initial call to display the first question
displayQuestion(currentQuestionIndex);
