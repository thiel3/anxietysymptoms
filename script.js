const questions = [
    "Feeling nervous, restless, or on edge",
    "Excessive worrying or difficulty controlling worry",
    "Feeling irritable or easily annoyed",
    "Persistent sense of impending danger or doom",
    "Rapid heartbeat, palpitations, or chest discomfort",
    "Difficulty breathing or shortness of breath",
    "Feeling dizzy, shaky, or trembling",
    "Muscle tension or unexplained aches and pains",
    "Trouble falling asleep or staying asleep due to anxiety",
    "Avoiding certain activities or social situations because of anxiety"
  ];
  
  const answers = ["Never", "Rarely", "Sometimes", "Frequently", "Always"];
  
  function buildQuiz() {
    const quizContainer = document.getElementById('quiz');
    const output = [];
  
    questions.forEach((currentQuestion, questionNumber) => {
      const answerOptions = [];
  
      answers.forEach((answerText, answerValue) => {
        answerOptions.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${answerValue}" required>
            ${answerText}
          </label><br>`
        );
      });
  
      output.push(
        `<div class="question">
          <strong>${questionNumber + 1}. ${currentQuestion}</strong><br>
          ${answerOptions.join('')}
        </div>`
      );
    });
  
    quizContainer.innerHTML = output.join('');
  }
  
  function showResults() {
    const answerContainers = document.querySelectorAll('.question');
    let totalScore = 0;
  
    questions.forEach((currentQuestion, questionNumber) => {
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (document.querySelector(selector) || {}).value;
      totalScore += parseInt(userAnswer, 10);
    });
  
    let anxietyLevel, recommendation;
  
    if (totalScore <= 10) {
      anxietyLevel = "Mild Anxiety";
      recommendation = "Consider basic relaxation techniques and read some of our articles on managing stress.";
    } else if (totalScore <= 24) {
      anxietyLevel = "Moderate Anxiety";
      recommendation = "Explore self-help resources, guided exercises, and anxiety tracking journals.";
    } else {
      anxietyLevel = "Severe Anxiety";
      recommendation = "We strongly recommend consulting with a mental health professional. Consider online counseling services or urgent support resources.";
    }
  
    document.getElementById('results').innerHTML = `
      Your Anxiety Level: <strong>${anxietyLevel}</strong><br><br>
      Recommendation: ${recommendation}
    `;
  }
  
  document.getElementById('submit').addEventListener('click', () => {
    const allAnswered = document.querySelectorAll('input[type=radio]:checked').length === questions.length;
    
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }
  
    showResults();
  });
  
  // Initialize quiz
  buildQuiz();
  