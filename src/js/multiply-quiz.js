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
    display: block;
    margin: 0 auto;
    padding: 1rem;
  }

  #quiz {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  #question {
    font-size: 3rem;
  }

  #answerInput {
    width: 100%;
    max-width: 6.25rem;
    text-align: center;
    font-size: 2.55rem;
    background-color: var(--input-bg-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
  }

  @media (min-width: 1200px) {
    #question {
      font-size: 5rem;
    }

    #answerInput {
      font-size: 4rem;
      max-width: 9.25rem;
    }
  }

  #answerInput:focus-visible {
    outline-color: var(--outline-color);
  }

  #score {
    font-size: 1rem;
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }

  #feedback {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    margin-block-start: 1rem;
    text-align: center;
    font-size: 1.25rem;
  }

  #feedback:empty {
    display: none;
  }

  #questionsCount {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    font-size: 1rem;
  }
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>

  <div id="score"></div>

  <div id="quiz">
    <div id="question">Loading...</div>
    <form id="answerForm">
      <input type="number" id="answerInput" required min="0" max="100">
    </form>
  </div>

  <div id="feedback"></div>
  <div id="questionsCount"></div>
`;

class MultiplyQuiz extends HTMLElement {
  #answerForm = null;
  #questionEl = null;
  #answerInput = null;
  #feedbackEl = null;
  #scoreEl = null;
  #questionsCountEl = null;

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
    this.#questionsCountEl = this.shadowRoot.getElementById('questionsCount');

    this.#answerInput.focus();

    this.#answerForm.addEventListener('submit', this.#handleFormSubmit);

    if (this.type === 'sequential') {
      this.currentIndex = -1;
    } else {
      this.usedQuestions = new Set();
    }

    this.init();
  }

  disconnectedCallback() {
    this.#answerForm.removeEventListener('submit', this.#handleFormSubmit);
  }

  init() {
    this.totalQuestions = this.questions.length;
    this.nextQuestion();
  }

  #handleFormSubmit = evt => {
    evt.preventDefault();
    this.#checkAnswer();
  };

  nextQuestion() {
    if (this.type === 'sequential') {
      this.#nextSequentialQuestion();
    } else {
      this.#nextRandomQuestion();
    }

    this.#updateScore();
    this.#updateQuestionsCount();
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
        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--text-success)" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg> Correct!
      `;
      this.correctAnswers++;
    } else {
      this.#feedbackEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--text-error)" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg> Incorrect! The answer is ${correctAnswer}.
      `;
      timeout = 2000;
    }

    this.#updateScore();
    this.#answerInput.style.pointerEvents = 'none';

    setTimeout(() => {
      this.#answerInput.value = '';
      this.#answerInput.style.pointerEvents = 'auto';
      this.#answerInput.focus();
      this.#feedbackEl.textContent = '';
      this.nextQuestion();
    }, timeout);
  }

  #updateScore() {
    const correctRate = ((this.correctAnswers / this.totalQuestions) * 100).toFixed(2);
    this.#scoreEl.textContent = `Score: ${this.correctAnswers} / ${this.totalQuestions} (${correctRate}%)`;
  }

  #updateQuestionsCount() {
    this.answeredQuestions += 1;
    this.#questionsCountEl.textContent = `Questions: ${this.answeredQuestions} / ${this.totalQuestions}`;
  }

  #showCompletionMessage() {
    this.#questionEl.textContent = "Congratulations! You've completed all questions.";
    this.#answerForm.hidden = true;
    this.#updateScore();
  }

  #generateQuestions() {
    const questions = [];

    for (let num1 = 1; num1 <= 10; num1++) {
      for (let num2 = 1; num2 <= 10; num2++) {
        questions.push({ num1, num2, solution: num1 * num2 });
      }
    }

    return questions;
  }

  /**
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   */
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
