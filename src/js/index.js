import '../css/main.css';
import { QuizIntro } from './components/quiz-intro.js';
import { MultiplyQuiz } from './components/multiply-quiz.js';

const mainEl = document.querySelector('main');

document.addEventListener('quiz-start', evt => {
  const QuizIntroEl = document.querySelector('quiz-intro');
  const quizEl = document.createElement('multiply-quiz');
  evt.detail.sequential && quizEl?.setAttribute('sequential', '');
  evt.detail.multipleChoice && quizEl?.setAttribute('multiple-choice', '');
  mainEl?.appendChild(quizEl);
  QuizIntroEl?.remove();
});

document.addEventListener('quiz-restart', () => {
  const quizEl = document.querySelector('multiply-quiz');
  const QuizIntroEl = document.createElement('quiz-intro');
  mainEl?.appendChild(QuizIntroEl);
  quizEl?.remove();
});

QuizIntro.defineCustomElement();
MultiplyQuiz.defineCustomElement();
