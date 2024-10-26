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
    /* min-width: 18.75rem; */
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
    text-align: center;
    font-size: 2.55rem;
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
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    margin-block-start: 1rem;
  }

  #feedback:empty {
    display: none;
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
`;

class MultiplyQuiz extends HTMLElement {
  #answerForm = null;
  #questionEl = null;
  #answerInput = null;
  #feedbackEl = null;
  #scoreEl = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }

    this.correctAnswers = 0;
    this.totalQuestions = 0;
    this.questions = this.#generateQuestions();
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

    if (num1 * num2 === userAnswer) {
      this.#feedbackEl.textContent = 'Correct!';
      this.correctAnswers++;
    } else {
      this.#feedbackEl.textContent = `Incorrect. The answer is ${num1 * num2}.`;
    }

    this.#updateScore();
    this.#answerInput.disabled = true;

    setTimeout(() => {
      this.#answerInput.value = '';
      this.#answerInput.disabled = false;
      this.#answerInput.focus();
      this.#feedbackEl.textContent = '';
      this.nextQuestion();
    }, 1000);
  }

  #updateScore() {
    const correctRate = ((this.correctAnswers / this.totalQuestions) * 100).toFixed(2);
    this.#scoreEl.textContent = `Score: ${this.correctAnswers} / ${this.totalQuestions} (${correctRate}%)`;
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
        questions.push({ num1, num2 });
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
