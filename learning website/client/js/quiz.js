const apiUrl = 'http://localhost:5000/api';
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const quizForm = document.getElementById('quiz-form');
const submitQuizButton = document.getElementById('submit-quiz');
const quizResult = document.getElementById('quiz-result');

const courseId = new URLSearchParams(window.location.search).get('courseId');
let quizData = null;

const loadQuiz = async () => {
  if (!courseId) return;

  const response = await fetch(`${apiUrl}/quizzes/${courseId}`);
  if (!response.ok) {
    quizForm.innerHTML = '<p>Quiz not available.</p>';
    return;
  }

  quizData = await response.json();
  quizForm.innerHTML = quizData.questions
    .map(
      (question, index) => `
        <div class="quiz-question">
          <h3>${question.question}</h3>
          ${question.options
            .map(
              (option) => `
                <label>
                  <input type="radio" name="question-${index}" value="${option}" />
                  ${option}
                </label>
              `
            )
            .join('')}
        </div>
      `
    )
    .join('');
};

const submitQuiz = async () => {
  const answers = quizData.questions.map((_, index) => {
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);
    return selected ? selected.value : null;
  });

  const response = await fetch(`${apiUrl}/quizzes/${courseId}/submit`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });

  const data = await response.json();
  if (!response.ok) {
    return alert(data.message || 'Quiz submission failed');
  }

  quizResult.textContent = `Your score is ${data.score}.`;
};

if (courseId && quizForm) {
  loadQuiz();
}

if (submitQuizButton) {
  submitQuizButton.addEventListener('click', submitQuiz);
}
