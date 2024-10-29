import celebrationIcon from '../../assets/celebration.png';
import { shuffle } from '../utils/shuffle.js';

const NUM_OF_MULTIPLE_CHOICES = 3;

const styles = /* css */ `
  :host {
    display: grid;
    grid-template-areas: "header" "content";
    grid-template-rows: auto 1fr;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  :host([hidden]),
  [hidden],
  ::slotted([hidden]) {
    display: none !important;
  }

  #quiz {
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
  }

  #answerForm {
    display: flex;
    gap: 0.5rem;
  }

  #question {
    font-size: 3rem;
    font-weight: bold;
  }

  #answerInput {
    max-width: 8rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background-color: var(--input-bg-color);
    font-family: inherit;
    font-size: 2.55rem;
    font-weight: bold;
    color: inherit;
    text-align: center;
  }

  #answerInput:focus-visible {
    outline-color: var(--outline-color);
  }

  .header {
    grid-area: header;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding-block: 1rem;
    font-size: 1rem;
  }

  #feedback {
    position: absolute;
    left: 0;
    top: calc(50% + 5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    margin-block-start: 1rem;
    text-align: center;
    font-size: 1rem;
  }

  #feedback:empty {
    display: none !important;
  }

  .completion-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    font-size: calc(1.425rem + 1vw);
    text-align: center;
    text-wrap: balance;
  }

  .completion-message img {
    border-radius: 50%;
    border: 5px solid var(--body-color);
  }

  button:focus-visible {
    outline-color: var(--outline-color);
  }

  button {
    background-color: var(--btn-bg-color);
    color: var(--body-bg-color);
    border: none;
    border-radius: var(--border-radius);
    padding: 0.75rem 1.25rem;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
  }

  #multipleChoice:empty,
  :host(:not([multiple-choice])) #multipleChoice {
    display: none !important;
  }

  #multipleChoice {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-block-start: 1rem;
  }

  #multipleChoice > button {
    min-width: 4rem;
    padding: 0.5rem 2rem;
    border-radius: 50rem;
    border: 2px solid var(--body-color);
    background-color: transparent;
    color: var(--body-color);
    font-family: inherit;
    font-size: 1.2rem;
  }

  #multipleChoice > button.correct {
    background-color: var(--success-color);
    border-color: color-mix(in srgb, var(--success-color) 40%, #ffffff);
    color: var(--body-bg-color);
  }

  #multipleChoice > button.incorrect {
    background-color: var(--error-color);
    border-color: color-mix(in srgb, var(--error-color) 40%, #ffffff);
    color: var(--body-bg-color);
  }

  @media (min-width: 1024px) {
    #question {
      font-size: 4rem;
    }

    #answerInput {
      font-size: 3.55rem;
    }
  }
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>

  <div class="header">
    <div id="score"></div>
    <progress id="progress"></progress>
  </div>

  <div id="quiz">
    <form id="answerForm">
      <label for="answerInput" id="question">Loading...</label>
      <input type="number" id="answerInput" required min="0" max="100">
    </form>

    <div id="multipleChoice"></div>

    <div id="feedback"></div>
  </div>
`;

class MultiplyQuiz extends HTMLElement {
  #questions = [];
  #correctAnswers = 0;
  #totalQuestions = 0;
  #answeredQuestions = 0;
  #currentIndex = -1;
  #usedQuestions = new Set();
  #feedbackTimeout = null;
  #answerForm = null;
  #questionEl = null;
  #answerInput = null;
  #feedbackEl = null;
  #scoreEl = null;
  #progressEl = null;
  #multipleChoiceEl = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  get sequential() {
    return this.hasAttribute('sequential');
  }

  set sequential(value) {
    this.toggleAttribute('sequential', !!value);
  }

  get multipleChoice() {
    return this.hasAttribute('multiple-choice');
  }

  set multipleChoice(value) {
    this.toggleAttribute('multiple-choice', !!value);
  }

  connectedCallback() {
    this.#upgradeProperty('sequential');
    this.#upgradeProperty('multipleChoice');

    this.#answerForm = this.shadowRoot.getElementById('answerForm');
    this.#questionEl = this.shadowRoot.getElementById('question');
    this.#answerInput = this.shadowRoot.getElementById('answerInput');
    this.#feedbackEl = this.shadowRoot.getElementById('feedback');
    this.#scoreEl = this.shadowRoot.getElementById('score');
    this.#progressEl = this.shadowRoot.getElementById('progress');
    this.#multipleChoiceEl = this.shadowRoot.getElementById('multipleChoice');

    this.#answerForm.addEventListener('submit', this.#handleFormSubmit);
    this.#multipleChoiceEl.addEventListener('click', this.#handleMultipleChoiceSelect);

    this.#init();

    if (this.multipleChoice) {
      this.#answerInput.setAttribute('disabled', '');
      this.#answerInput.setAttribute('type', 'text');
    } else {
      this.#answerInput.focus();
    }
  }

  disconnectedCallback() {
    this.#answerForm.removeEventListener('submit', this.#handleFormSubmit);
    this.#multipleChoiceEl.removeEventListener('click', this.#handleMultipleChoiceSelect);
  }

  #init() {
    this.#questions = this.#generateQuestions();
    this.#totalQuestions = this.#questions.length;
    this.#nextQuestion();
  }

  #handleFormSubmit = evt => {
    evt.preventDefault();

    if (this.#feedbackTimeout) {
      return;
    }

    this.#checkAnswer();
  };

  #handleMultipleChoiceSelect = evt => {
    const btn = evt.target.closest('button');

    if (this.#feedbackTimeout || !btn) {
      return;
    }

    this.#answerInput.value = btn.textContent;
    this.#checkAnswer();
  };

  #handleRestartQuiz = () => {
    this.dispatchEvent(new Event('quiz-restart', { bubbles: true, composed: true }));
  };

  #generateQuestions() {
    const questions = [];

    for (let factor1 = 1; factor1 <= 10; factor1 += 1) {
      for (let factor2 = 1; factor2 <= 10; factor2 += 1) {
        const product = factor1 * factor2;
        questions.push({ factor1, factor2, product });
      }
    }

    if (this.multipleChoice) {
      questions.forEach(question => {
        question.answerChoices = [question.product];

        while (question.answerChoices.length < NUM_OF_MULTIPLE_CHOICES) {
          const randomAnswer = questions[Math.floor(Math.random() * questions.length)].product;

          if (question.answerChoices.includes(randomAnswer)) {
            continue;
          }

          question.answerChoices.push(randomAnswer);
        }

        question.answerChoices = shuffle(question.answerChoices);
      });
    }

    return questions;
  }

  #nextQuestion() {
    this.sequential ? this.#nextSequentialQuestion() : this.#nextRandomQuestion();
    this.#updateScore();
    this.#updateProgress();
  }

  #nextSequentialQuestion() {
    this.#currentIndex += 1;

    if (this.#currentIndex < this.#totalQuestions) {
      const { factor1, factor2 } = this.#questions[this.#currentIndex];
      this.#questionEl.textContent = `${factor1} x ${factor2} =`;

      if (this.multipleChoice) {
        const question = this.#questions[this.#currentIndex];
        this.#updateMultipleChoice(question.answerChoices);
      }
    } else {
      this.#showCompletionMessage();
    }
  }

  #nextRandomQuestion() {
    if (this.#usedQuestions.size === this.#totalQuestions) {
      this.#showCompletionMessage();
      return;
    }

    let question;

    do {
      this.#currentIndex = Math.floor(Math.random() * this.#totalQuestions);
      question = this.#questions[this.#currentIndex];
    } while (this.#usedQuestions.has(`${question.factor1}-${question.factor2}`));

    this.#usedQuestions.add(`${question.factor1}-${question.factor2}`);
    this.#questionEl.textContent = `${question.factor1} x ${question.factor2} =`;

    if (this.multipleChoice) {
      this.#updateMultipleChoice(question.answerChoices);
    }
  }

  #updateMultipleChoice(answerChoices) {
    this.#multipleChoiceEl.replaceChildren();

    answerChoices.forEach(answer => {
      const btn = document.createElement('button');
      btn.setAttribute('data-answer', answer);
      btn.type = 'button';
      btn.textContent = answer;
      this.#multipleChoiceEl.appendChild(btn);
    });
  }

  #checkAnswer() {
    const userAnswer = parseInt(this.#answerInput.value, 10);
    const correctAnswer = this.#questions[this.#currentIndex].product;
    let timeout = 1000;

    if (this.multipleChoice) {
      this.#multipleChoiceEl.setAttribute('inert', '');

      if (userAnswer === correctAnswer) {
        const correctBtn = this.#multipleChoiceEl.querySelector(`button[data-answer="${correctAnswer}"]`);
        correctBtn.classList.add('correct');
        this.#correctAnswers += 1;
      } else {
        const correctBtn = this.#multipleChoiceEl.querySelector(`button[data-answer="${correctAnswer}"]`);
        const incorrectBtn = this.#multipleChoiceEl.querySelector(`button[data-answer="${userAnswer}"]`);
        correctBtn.classList.add('correct');
        incorrectBtn.classList.add('incorrect');
        timeout = 2000;
      }
    } else {
      this.#answerInput.style.pointerEvents = 'none';

      if (userAnswer === correctAnswer) {
        this.#feedbackEl.innerHTML = /* html */ `
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--success-color)" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg> Correct!
        `;

        this.#correctAnswers += 1;
      } else {
        this.#feedbackEl.innerHTML = /* html */ `
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--error-color)" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
          </svg> Incorrect! The answer is ${correctAnswer}.
        `;

        timeout = 2000;
      }
    }

    this.#updateScore();

    this.#feedbackTimeout = setTimeout(() => {
      this.#answerInput.value = '';
      this.#answerInput.focus();
      this.#nextQuestion();
      this.#feedbackTimeout = null;

      if (this.multipleChoice) {
        this.#multipleChoiceEl.removeAttribute('inert');

        this.#multipleChoiceEl.querySelectorAll('button').forEach(btn => {
          btn.classList.remove('correct', 'incorrect');
        });
      } else {
        this.#answerInput.style.pointerEvents = 'auto';
        this.#feedbackEl.replaceChildren();
      }
    }, timeout);
  }

  #updateScore() {
    const correctRate = ((this.#correctAnswers / this.#answeredQuestions) * 100 || 0).toFixed(0);
    this.#scoreEl.textContent = `Score: ${this.#correctAnswers} / ${this.#answeredQuestions} (${correctRate}%)`;
  }

  #updateProgress() {
    this.#answeredQuestions += 1;
    this.#progressEl.value = this.#answeredQuestions / this.#totalQuestions;
  }

  #showCompletionMessage() {
    this.shadowRoot.getElementById('quiz').innerHTML = /* html */ `
      <div class="completion-message">
        <img src="${celebrationIcon}" alt="Celebration" width="125" height="121" aria-hidden="true">
        Congratulations! You've completed all questions.
        <br>
        Your final score is ${this.#correctAnswers} / ${this.#totalQuestions}.
        <div>
          <button id="restartQuiz">Start Over</button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.header').setAttribute('hidden', '');
    this.#updateScore();

    const restartBtn = this.shadowRoot.getElementById('restartQuiz');
    restartBtn?.addEventListener('click', this.#handleRestartQuiz, { once: true });
  }

  #upgradeProperty(prop) {
    const instance = this;
    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  static defineCustomElement(elementName = 'multiply-quiz') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, MultiplyQuiz);
    }
  }
}

export { MultiplyQuiz };
