import { getLanguage, DEFAULT_LANGUAGE, languages } from '../services/i18n/i18n.js';

const styles = /* css */ `
  :host {
    --select-arrow: url("data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='62.5' width='116.9' fill='%23161f27'%3E %3Cpath d='M115.3,1.6 C113.7,0 111.1,0 109.5,1.6 L58.5,52.7 L7.4,1.6 C5.8,0 3.2,0 1.6,1.6 C0,3.2 0,5.8 1.6,7.4 L55.5,61.3 C56.3,62.1 57.3,62.5 58.4,62.5 C59.4,62.5 60.5,62.1 61.3,61.3 L115.2,7.4 C116.9,5.8 116.9,3.2 115.3,1.6Z'/%3E %3C/svg%3E");

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

  select {
    cursor: pointer;
    font-size: 0.9rem;
    border: 1px solid var(--btn-border-color);
    padding-block: 0.25rem;
    padding-inline: 0.5rem 2rem;
    border-radius: 50rem;
    background: var(--accent-light) var(--select-arrow) calc(100% - 0.5rem) 50% / 0.75rem no-repeat;
    color: var(--body-color);
    appearance: none;
    -webkit-appearance: none;
  }
`;

const template = document.createElement('template');

template.innerHTML = /* html */ `
  <style>${styles}</style>
  <select></select>
`;

class LanguageSelect extends HTMLElement {
  #selectEl = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  connectedCallback() {
    this.#selectEl = this.shadowRoot.querySelector('select');

    const currentLanguage = getLanguage();

    Object.entries(languages).forEach(([key, value]) => {
      const optionEl = document.createElement('option');
      optionEl.value = key;
      optionEl.textContent = value.name;
      optionEl.selected = key === currentLanguage;
      this.#selectEl.appendChild(optionEl);
    });

    this.#selectEl.addEventListener('change', this.#handleSelectChange);
  }

  disconnectedCallback() {
    this.#selectEl.removeEventListener('change', this.#handleSelectChange);
  }

  #handleSelectChange = evt => {
    this.dispatchEvent(
      new CustomEvent('language-change', {
        bubbles: true,
        composed: true,
        detail: { language: evt.target.value || DEFAULT_LANGUAGE }
      })
    );
  };

  static defineCustomElement(elementName = 'language-select') {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, LanguageSelect);
    }
  }
}

export { LanguageSelect };
