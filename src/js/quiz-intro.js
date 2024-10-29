import logoIcon from '../assets/app-icons/android-chrome-192x192.png';

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
    place-items: center;
    height: 100%;
  }

  button:focus-visible,
  input[type="radio"]:focus-visible {
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

  h1 {
    margin: 0;
    font-size: calc(1.425rem + 1.4vw);
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem;
  }

  form > div {
    display: flex;
    gap: 1rem;
  }

  form > img {
    border-radius: 50%;
    border: 5px solid var(--border-color);
  }
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>

  <form>
    <img src="${logoIcon}" alt="Quiz" width="125" height="125" aria-hidden="true">

    <h1>Choose a quiz type</h1>

    <div>
      <div>
        <input type="radio" name="quizType" id="random" value="random" checked>
        <label for="random">Random</label>
      </div>

      <div>
        <input type="radio" name="quizType" id="sequential" value="sequential">
        <label for="sequential">Sequential</label>
      </div>
    </div>

    <button type="submit">Start Quiz</button>
  </form>
`;

class QuizIntro extends HTMLElement {
  #form = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  connectedCallback() {
    this.#form = this.shadowRoot.querySelector('form');
    this.#form.addEventListener('submit', this.#handleFormSubmit);
  }

  disconnectedCallback() {
    this.#form.removeEventListener('submit', this.#handleFormSubmit);
  }

  #handleFormSubmit = evt => {
    evt.preventDefault();

    const quizType = evt.target['quizType'].value;

    this.dispatchEvent(
      new CustomEvent('quiz-start', {
        bubbles: true,
        composed: true,
        detail: { quizType }
      })
    );
  };

  static defineCustomElement(elementName = 'quiz-intro') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, QuizIntro);
    }
  }
}

export { QuizIntro };
