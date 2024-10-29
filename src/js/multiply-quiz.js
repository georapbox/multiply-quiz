import celebrationIcon from '../assets/celebration.png';

const styles = /* css */ `
  :host {
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

  :host {
    display: grid;
    grid-template-areas: "header" "content" "footer";
    grid-template-rows: 3rem 1fr 3rem;
    width: 100%;
    height: 100%;
  }

  #quiz {
    grid-area: content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
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

  #score {
    grid-area: header;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  #feedback {
    position: absolute;
    left: 0;
    top: calc(50% + 2.5rem);
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
    display: none;
  }

  .progress-container {
    grid-area: footer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  progress {
    width: calc(80% - 1rem);
    max-width: 14rem;
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
    border: 5px solid var(--border-color);
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

  <div id="score"></div>

  <div id="quiz">
    <form id="answerForm">
      <label for="answerInput" id="question">Loading...</label>
      <input type="number" id="answerInput" required min="0" max="100">
    </form>

    <div id="feedback"></div>
  </div>

  <div class="progress-container">
    <progress id="progress"></progress>
  </div>
`;

class MultiplyQuiz extends HTMLElement {
  #timeout = null;
  #answerForm = null;
  #questionEl = null;
  #answerInput = null;
  #feedbackEl = null;
  #scoreEl = null;
  #progressEl = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.correctAnswers = 0;
    this.totalQuestions = 0;
    this.questions = this.#generateQuestions();
    this.answeredQuestions = 0;
  }

  get type() {
    return this.getAttribute('type') || 'random';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  connectedCallback() {
    this.#upgradeProperty('type');

    this.#answerForm = this.shadowRoot.getElementById('answerForm');
    this.#questionEl = this.shadowRoot.getElementById('question');
    this.#answerInput = this.shadowRoot.getElementById('answerInput');
    this.#feedbackEl = this.shadowRoot.getElementById('feedback');
    this.#scoreEl = this.shadowRoot.getElementById('score');
    this.#progressEl = this.shadowRoot.getElementById('progress');

    this.#answerInput.focus();

    this.#answerForm.addEventListener('submit', this.#handleFormSubmit);

    if (this.type === 'sequential') {
      this.currentIndex = -1;
    } else {
      this.usedQuestions = new Set();
    }

    this.#init();
  }

  disconnectedCallback() {
    this.#answerForm.removeEventListener('submit', this.#handleFormSubmit);
  }

  #init() {
    this.totalQuestions = this.questions.length;
    this.#nextQuestion();
  }

  #handleFormSubmit = evt => {
    evt.preventDefault();

    if (this.#timeout) {
      return;
    }

    this.#checkAnswer();
  };

  #handleRestartQuiz = () => {
    this.dispatchEvent(new Event('quiz-restart', { bubbles: true, composed: true }));
  };

  #generateQuestions() {
    const questions = [];

    for (let num1 = 1; num1 <= 10; num1++) {
      for (let num2 = 1; num2 <= 10; num2++) {
        questions.push({ num1, num2, solution: num1 * num2 });
      }
    }

    return questions;
  }

  #nextQuestion() {
    if (this.type === 'sequential') {
      this.#nextSequentialQuestion();
    } else {
      this.#nextRandomQuestion();
    }

    this.#updateScore();
    this.#updateProgress();
  }

  #nextSequentialQuestion() {
    this.currentIndex++;

    if (this.currentIndex < this.totalQuestions) {
      const { num1, num2 } = this.questions[this.currentIndex];
      this.#questionEl.textContent = `${num1} x ${num2} =`;
    } else {
      this.#showCompletionMessage();
    }
  }

  #nextRandomQuestion() {
    if (this.usedQuestions.size === this.totalQuestions) {
      this.#showCompletionMessage();
      return;
    }

    let question;

    do {
      this.currentIndex = Math.floor(Math.random() * this.totalQuestions);
      question = this.questions[this.currentIndex];
    } while (this.usedQuestions.has(`${question.num1}-${question.num2}`));

    this.usedQuestions.add(`${question.num1}-${question.num2}`);
    this.#questionEl.textContent = `${question.num1} x ${question.num2} =`;
  }

  #checkAnswer() {
    const userAnswer = parseInt(this.#answerInput.value, 10);
    const { num1, num2 } = this.questions[this.currentIndex];
    const correctAnswer = num1 * num2;
    let timeout = 1000;

    if (userAnswer === correctAnswer) {
      this.#feedbackEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--success-color)" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg> Correct!
      `;
      this.correctAnswers++;
    } else {
      this.#feedbackEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--error-color)" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg> Incorrect! The answer is ${correctAnswer}.
      `;
      timeout = 2000;
    }

    this.#updateScore();
    this.#answerInput.style.pointerEvents = 'none';

    this.#timeout = setTimeout(() => {
      this.#answerInput.value = '';
      this.#answerInput.style.pointerEvents = 'auto';
      this.#answerInput.focus();
      this.#feedbackEl.textContent = '';
      this.#nextQuestion();
      this.#timeout = null;
    }, timeout);
  }

  #updateScore() {
    const correctRate = ((this.correctAnswers / this.answeredQuestions) * 100 || 0).toFixed(0);
    this.#scoreEl.textContent = `Score: ${this.correctAnswers} / ${this.answeredQuestions} (${correctRate}%)`;
  }

  #updateProgress() {
    this.answeredQuestions += 1;
    this.#progressEl.value = this.answeredQuestions / this.totalQuestions;
  }

  #showCompletionMessage() {
    this.#questionEl.innerHTML = /* html */ `
      <div class="completion-message">
        <img src="${celebrationIcon}" alt="Celebration" width="125" height="121" aria-hidden="true">
        Congratulations! You've completed all questions.
        <br>
        Your final score is ${this.correctAnswers} / ${this.totalQuestions}.
        <div>
          <button id="restartQuiz">Start Over</button>
        </div>
      </div>
    `;
    this.#scoreEl.hidden = true;
    this.#answerForm.hidden = true;
    this.#progressEl.hidden = true;
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
