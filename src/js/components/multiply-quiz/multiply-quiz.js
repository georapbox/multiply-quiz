import celebrationIcon from '../../../assets/celebration.png';
import { shuffle } from '../../utils/shuffle.js';
import { templateHTML } from './template.js';

const NUM_OF_MULTIPLE_CHOICES = 3;
const FEEDBACK_TIMEOUT = 1000;
const FEEDBACK_TIMEOUT_INCORRECT = 2000;

const template = document.createElement('template');
template.innerHTML = templateHTML;

class MultiplyQuiz extends HTMLElement {
  #questions = [];
  #correctAnswers = 0;
  #totalQuestions = 0;
  #shownQuestionsCount = 0;
  #currentIndex = -1;
  #usedQuestions = new Set();
  #wrongAnswers = new Set();
  #feedbackTimeout = null;
  #answerForm = null;
  #questionEl = null;
  #answerInput = null;
  #feedbackEl = null;
  #scoreEl = null;
  #progressEl = null;
  #multipleChoiceEl = null;
  #quitQuizBtn = null;

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
    this.#quitQuizBtn = this.shadowRoot.getElementById('quitQuiz');

    this.#answerForm.addEventListener('submit', this.#handleFormSubmit);
    this.#multipleChoiceEl.addEventListener('click', this.#handleMultipleChoiceSelect);
    this.#quitQuizBtn.addEventListener('click', this.#handleQuitQuiz);

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
    this.#quitQuizBtn.addEventListener('click', this.#handleQuitQuiz);

    if (this.#feedbackTimeout !== null) {
      clearTimeout(this.#feedbackTimeout);
      this.#feedbackTimeout = null;
    }
  }

  #init() {
    this.#questions = this.#generateQuestions();
    this.#totalQuestions = this.#questions.length;
    this.#nextQuestion();
  }

  #handleFormSubmit = evt => {
    evt.preventDefault();

    if (this.#feedbackTimeout !== null) {
      return;
    }

    this.#checkAnswer();
  };

  #handleMultipleChoiceSelect = evt => {
    const btn = evt.target.closest('button');

    if (this.#feedbackTimeout !== null || !btn) {
      return;
    }

    this.#answerInput.value = btn.textContent;
    this.#checkAnswer();
  };

  #handleRestartQuiz = () => {
    this.dispatchEvent(new Event('quiz-restart', { bubbles: true, composed: true }));
  };

  #handleQuitQuiz = () => {
    if (this.#shownQuestionsCount === 1 && this.#feedbackTimeout === null) {
      return this.#handleRestartQuiz();
    }

    if (confirm('Quit the quiz? Your progress will be lost.')) {
      this.#handleRestartQuiz();
    }
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
    const currentQuestion = this.#questions[this.#currentIndex];

    if (this.#currentIndex < this.#totalQuestions) {
      const { factor1, factor2 } = currentQuestion;
      this.#questionEl.textContent = `${factor1} x ${factor2} =`;

      if (this.multipleChoice) {
        const question = currentQuestion;
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

    let currentQuestion;

    do {
      this.#currentIndex = Math.floor(Math.random() * this.#totalQuestions);
      currentQuestion = this.#questions[this.#currentIndex];
    } while (this.#usedQuestions.has(`${currentQuestion.factor1}-${currentQuestion.factor2}`));

    this.#usedQuestions.add(`${currentQuestion.factor1}-${currentQuestion.factor2}`);
    this.#questionEl.textContent = `${currentQuestion.factor1} x ${currentQuestion.factor2} =`;

    if (this.multipleChoice) {
      this.#updateMultipleChoice(currentQuestion.answerChoices);
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
    const currentQuestion = this.#questions[this.#currentIndex];
    const correctAnswer = currentQuestion.product;
    let timeout = FEEDBACK_TIMEOUT;

    if (this.multipleChoice) {
      this.#multipleChoiceEl.setAttribute('inert', '');

      if (userAnswer === correctAnswer) {
        const correctBtn = this.#multipleChoiceEl.querySelector(`button[data-answer="${correctAnswer}"]`);
        correctBtn.classList.add('correct');
        this.#answerInput.classList.add('correct');
        this.#correctAnswers += 1;
      } else {
        const correctBtn = this.#multipleChoiceEl.querySelector(`button[data-answer="${correctAnswer}"]`);
        const incorrectBtn = this.#multipleChoiceEl.querySelector(`button[data-answer="${userAnswer}"]`);
        correctBtn.classList.add('correct');
        incorrectBtn.classList.add('incorrect');
        this.#answerInput.classList.add('incorrect');
        timeout = FEEDBACK_TIMEOUT_INCORRECT;
        this.#wrongAnswers.add({
          question: `${currentQuestion.factor1} x ${currentQuestion.factor2}`,
          userAnswer,
          correctAnswer
        });
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

        timeout = FEEDBACK_TIMEOUT_INCORRECT;

        this.#wrongAnswers.add({
          question: `${currentQuestion.factor1} x ${currentQuestion.factor2}`,
          userAnswer,
          correctAnswer
        });
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
        this.#answerInput.classList.remove('correct', 'incorrect');

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
    const correctRate = ((this.#correctAnswers / this.#shownQuestionsCount) * 100 || 0).toFixed(0);
    this.#scoreEl.textContent = `Score: ${this.#correctAnswers} / ${this.#shownQuestionsCount} (${correctRate}%)`;
  }

  #updateProgress() {
    this.#shownQuestionsCount += 1;
    this.#progressEl.value = this.#shownQuestionsCount / this.#totalQuestions;
  }

  #showCompletionMessage() {
    this.shadowRoot.getElementById('quiz').innerHTML = /* html */ `
      <div class="completion-message">
        <img src="${celebrationIcon}" alt="Celebration" width="125" height="121" aria-hidden="true">
        Congratulations! You've completed all questions.
        <br>
        Your final score is ${this.#correctAnswers} / ${this.#totalQuestions}.

        ${
          this.#wrongAnswers.size > 0
            ? /* html */ `
              <details>
                <summary>View incorrect answers</summary>

                <table>
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Your Answer</th>
                      <th>Correct Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${[...this.#wrongAnswers]
                      .map(({ question, userAnswer, correctAnswer }) => {
                        return /* html */ `
                          <tr>
                            <td>${question}</td>
                            <td>${userAnswer}</td>
                            <td>${correctAnswer}</td>
                          </tr>
                        `;
                      })
                      .join('')}
                  </tbody>
                </table>
              </details>
            `
            : ''
        }

        <button id="restartQuiz">Start Over</button>
      </div>
    `;

    this.shadowRoot.querySelector('header').setAttribute('hidden', '');
    this.shadowRoot.querySelector('footer').setAttribute('hidden', '');
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
