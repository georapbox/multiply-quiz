import logoLightIcon from '../../../assets/logo-light.png';
import logoDarkIcon from '../../../assets/logo-dark.png';
import { styles } from './styles.js';

export const templateHTML = /* html */ `
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
