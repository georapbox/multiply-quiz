import '../css/main.css';
import { MultiplyQuiz } from './multiply-quiz.js';

const quizTypeForm = document.getElementById('quizTypeForm');

quizTypeForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const quizType = evt.target['quizType'].value;

  quizTypeForm.hidden = true;

  const quizEl = document.createElement('multiply-quiz');
  quizEl.setAttribute('type', quizType);

  document.querySelector('main').appendChild(quizEl);
});

MultiplyQuiz.defineCustomElement();
