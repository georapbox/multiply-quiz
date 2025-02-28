import logo from '../../assets/logo.png';
import { storage } from '../services/storage.js';
import { t } from '../services/i18n/i18n.js';

const styles = /* css */ `
  :host {
    display: grid;
    grid-template-rows: auto 1fr;
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

  language-select {
    margin-block-start: 1rem;
  }

  button:focus-visible,
  input[type="radio"]:focus-visible {
    outline-color: var(--outline-color);
  }

  button {
    background-color: var(--btn-bg-color);
    color: var(--body-color);
    border: 2px solid var(--btn-border-color);
    border-radius: 50rem;
    padding: 0.75rem 1.5rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .logo {
    border-radius: 50%;
    border: 3px solid var(--body-color);
  }

  h1 {
    margin: 0;
    font-size: calc(1.425rem + 2vw);
    color: var(--accent);
    text-shadow: 0.0625rem 0.0625rem 0.0625rem var(--body-color);
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
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 1rem;
    row-gap: 0.5rem;
  }
`;

const createTemplate = styles => {
  const template = document.createElement('template');

  template.innerHTML = /* html */ `
    <style>${styles}</style>

    <language-select></language-select>

    <form>
      <img src="${logo}" class="logo" alt="Quiz" width="120" height="120" aria-hidden="true">

      <h1>${t('chooseQuizType')}</h1>

      <div>
        <div>
          <input type="checkbox" name="sequential" id="sequential">
          <label for="sequential">${t('sequentialType')}</label>
        </div>

        <div>
          <input type="checkbox" name="multiple-choice" id="multiple-choice">
          <label for="multiple-choice">${t('multipleChoiceType')}</label>
        </div>
      </div>

      <button type="submit">${t('startQuizCTA')}</button>
    </form>
  `;

  return template;
};

class QuizIntro extends HTMLElement {
  #form = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(createTemplate(styles).content.cloneNode(true));
    }
  }

  connectedCallback() {
    this.#form = this.shadowRoot.querySelector('form');
    this.#form.addEventListener('submit', this.#handleFormSubmit);
    this.#form.addEventListener('change', this.#handleFormChange);

    const options = storage.getItem('options');

    if (options) {
      this.#form['sequential'].checked = options.sequential;
      this.#form['multiple-choice'].checked = options.multipleChoice;
    }
  }

  disconnectedCallback() {
    this.#form.removeEventListener('submit', this.#handleFormSubmit);
    this.#form.removeEventListener('change', this.#handleFormChange);
  }

  #handleFormChange = () => {
    const sequential = this.#form['sequential'].checked;
    const multipleChoice = this.#form['multiple-choice'].checked;
    storage.setItem('options', { sequential, multipleChoice });
  };

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
