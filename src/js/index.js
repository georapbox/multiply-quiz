import '../css/main.css';
import { getLanguage, setLanguage } from './services/i18n/i18n.js';
import { QuizIntro } from './components/quiz-intro.js';
import { MultiplyQuiz } from './components/multiply-quiz.js';
import { LanguageSelect } from './components/language-select.js';

const mainEl = document.querySelector('main');

document.documentElement.setAttribute('lang', getLanguage());

document.addEventListener('quiz-start', handleQuizStart);
document.addEventListener('quiz-restart', handleQuizRestart);
document.addEventListener('language-change', handleLanguageChange);
window.visualViewport.addEventListener('resize', handleVisualViewportResize);

QuizIntro.defineCustomElement();
MultiplyQuiz.defineCustomElement();
LanguageSelect.defineCustomElement();

function handleQuizStart(evt) {
  const quizIntroEl = document.querySelector('quiz-intro');
  const quizEl = document.createElement('multiply-quiz');
  const sequential = evt.detail.sequential;
  const multipleChoice = evt.detail.multipleChoice;

  sequential && quizEl?.setAttribute('sequential', '');
  multipleChoice && quizEl?.setAttribute('multiple-choice', '');
  mainEl?.appendChild(quizEl);
  quizIntroEl?.remove();
}

function handleQuizRestart() {
  const quizEl = document.querySelector('multiply-quiz');

  if (!quizEl) {
    return;
  }

  quizEl?.remove();
  mainEl?.appendChild(document.createElement('quiz-intro'));
}

function handleLanguageChange(evt) {
  setLanguage(evt.detail.language);

  const quizIntroEl = document.querySelector('quiz-intro');

  if (!quizIntroEl) {
    return;
  }

  quizIntroEl.remove();
  mainEl?.appendChild(document.createElement('quiz-intro'));
}

function handleVisualViewportResize() {
  // Fix for iOS Safari visualViewport height change when virtual keyboard is shown.
  document.documentElement.style.height = `${window.visualViewport.height}px`;
}
