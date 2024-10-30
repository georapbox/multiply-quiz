import { storage } from '../../services/storage.js';
import { templateHTML } from './template.js';

const template = document.createElement('template');
template.innerHTML = templateHTML;

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
