import { styles } from './styles.js';

export const templateHTML = /* html */ `
  <style>${styles}</style>

  <header>
    <div id="score"></div>
    <progress id="progress"></progress>
  </header>

  <div id="quiz">
    <form id="answerForm">
      <label for="answerInput" id="question">Loading...</label>
      <input type="number" id="answerInput" required min="0" max="100">
    </form>

    <div id="multipleChoice" class="multiple-choice"></div>

    <div class="feedback-container">
      <div id="feedback" class="feedback"></div>
    </div>
  </div>

  <footer>
    <button type="button" id="quitQuiz" class="quit-quiz-btn" aria-label="Quit quiz">Quit Quiz</button>
  </footer>
`;
