import logoLightIcon from '../../assets/logo-light.png';
import logoDarkIcon from '../../assets/logo-dark.png';

const styles = /* css */ `
  :host {
    display: grid;
    place-items: center;
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
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>

  <form>
    <picture>
      <source srcset="${logoLightIcon}" media="(prefers-color-scheme: dark)">
      <source srcset="${logoDarkIcon}" media="(prefers-color-scheme: light)">
      <img src="${logoDarkIcon}" alt="Quiz" width="120" height="120" aria-hidden="true">
    </picture>

    <h1>Choose a quiz type</h1>

    <div>
      <div>
        <input type="checkbox" name="sequential" id="sequential">
        <label for="sequential">Sequential</label>
      </div>

      <div>
        <input type="checkbox" name="multiple-choice" id="multiple-choice">
        <label for="multiple-choice">Multiple Choice</label>
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

    this.dispatchEvent(
      new CustomEvent('quiz-start', {
        bubbles: true,
        composed: true,
        detail: {
          sequential: evt.target['sequential'].checked,
          multipleChoice: evt.target['multiple-choice'].checked
        }
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
