import celebrationIcon from '../assets/celebration.png';

const NUM_OF_MULTIPLE_CHOICES = 3;

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
    grid-template-areas: "header" "content";
    grid-template-rows: minmax(4rem, auto) 1fr;
    width: 100%;
    height: 100%;
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
    gap: 0.25rem;
    font-size: 1rem;
  }

  #feedback {
    position: absolute;
    left: 0;
    top: calc(50% + 4.5rem);
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

  #multipleChoice {
    display: flex;
    gap: 0.5rem;
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
    border-color: var(--success-color);
    color: var(--body-bg-color);
  }

  #multipleChoice > button.incorrect {
    background-color: var(--error-color);
    border-color: var(--error-color);
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

    <div id="multipleChoice" hidden></div>

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
  #answerTimeout = null;
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
      this.shadowRoot.getElementById('multipleChoice').hidden = false;
      this.#answerInput.setAttribute('disabled', '');
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

    if (this.#answerTimeout) {
      return;
    }

    this.#checkAnswer();
  };

  #handleMultipleChoiceSelect = evt => {
    const btn = evt.target.closest('button');

    if (this.#answerTimeout || !btn) {
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

    for (let num1 = 1; num1 <= 10; num1 += 1) {
      for (let num2 = 1; num2 <= 10; num2 += 1) {
        const solution = num1 * num2;

        questions.push({ num1, num2, solution });
      }
    }

    if (this.multipleChoice) {
      questions.forEach(q => {
        q.answers = [q.solution];

        while (q.answers.length < NUM_OF_MULTIPLE_CHOICES) {
          const randomAnswer = questions[Math.floor(Math.random() * questions.length)].solution;

          if (q.answers.includes(randomAnswer)) {
            continue;
          }

          q.answers.push(randomAnswer);
        }

        q.answers = q.answers.sort(() => Math.random() - 0.5);
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
      const { num1, num2 } = this.#questions[this.#currentIndex];
      this.#questionEl.textContent = `${num1} x ${num2} =`;

      if (this.multipleChoice) {
        const question = this.#questions[this.#currentIndex];
        this.#updateMultipleChoice(question.answers);
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
    } while (this.#usedQuestions.has(`${question.num1}-${question.num2}`));

    this.#usedQuestions.add(`${question.num1}-${question.num2}`);
    this.#questionEl.textContent = `${question.num1} x ${question.num2} =`;

    if (this.multipleChoice) {
      this.#updateMultipleChoice(question.answers);
    }
  }

  #updateMultipleChoice(answers) {
    this.#multipleChoiceEl.replaceChildren();

    answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.setAttribute('data-answer', answer);
      btn.type = 'button';
      btn.textContent = answer;
      this.#multipleChoiceEl.appendChild(btn);
    });
  }

  #checkAnswer() {
    const userAnswer = parseInt(this.#answerInput.value, 10);
    const correctAnswer = this.#questions[this.#currentIndex].solution;
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

    this.#answerTimeout = setTimeout(() => {
      this.#answerInput.value = '';
      this.#answerInput.focus();
      this.#nextQuestion();
      this.#answerTimeout = null;

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
