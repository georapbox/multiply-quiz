function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},i=t.parcelRequireed01;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return r[e]=i,t.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){o[e]=t},t.parcelRequireed01=i),(0,i.register)("kyEFX",function(e,t){Object.defineProperty(e.exports,"register",{get:function(){return r},set:function(e){return r=e},enumerable:!0,configurable:!0});var r,o=new Map;r=function(e,t){for(var r=0;r<t.length-1;r+=2)o.set(t[r],{baseUrl:e,path:t[r+1]})}}),i("kyEFX").register(new URL("",import.meta.url).toString(),JSON.parse('["7bk21","index.a91f502a.js","gU4WN","logo.0a5e1a04.png","d9kyw","star-icon.3c1e655e.svg"]'));const n="multiply-quiz",s=new class{constructor(e="local"){this.storage="local"===e?localStorage:sessionStorage}getItem(e){try{return JSON.parse(this.storage.getItem(`${n}/${e}`))}catch{return null}}setItem(e,t){try{this.storage.setItem(`${n}/${e}`,JSON.stringify(t))}catch{}}};var l={};l=JSON.parse('{"loading":"Loading...","chooseQuizType":"Choose a quiz type","sequentialType":"In order (random by default)","multipleChoiceType":"Multiple Choice","startQuizCTA":"Start Quiz","quitQuizCTA":"Quit Quiz","startOverCTA":"Start Over","quitQuizConfirm":"Quit the quiz? Your progress will be lost.","score":"Score","correctFeedback":"Correct!","incorrectFeedback":"Incorrect! The correct answer is {correctAnswer}.","notAllCorrectMessage":"There are incorrect answers.","allCorrectMessage":"All questions answered correctly!","viewIncorrectAnswers":"View incorrect answers","question":"Question","yourAnswer":"Your Answer","correctAnswer":"Correct Answer"}');var a={};a=JSON.parse('{"loading":"Φόρτωση...","chooseQuizType":"Επιλέξτε τύπο κουίζ","sequentialType":"Σε σειρά (τυχαίο από προεπιλογή)","multipleChoiceType":"Πολλαπλής Επιλογής","startQuizCTA":"Έναρξη Κουίζ","quitQuizCTA":"Διακοπή Κουίζ","startOverCTA":"Επανεκκίνηση","quitQuizConfirm":"Διακοπή του κουίζ; Η πρόοδός σας θα χαθεί.","score":"Σκορ","correctFeedback":"Σωστό!","incorrectFeedback":"Λάθος! Η σωστή απάντηση είναι {correctAnswer}.","notAllCorrectMessage":"Υπάρχουν λανθασμένες απαντήσεις.","allCorrectMessage":"Όλες οι ερωτήσεις απαντήθηκαν σωστά!","viewIncorrectAnswers":"Προβολή λανθασμένων απαντήσεων","question":"Ερώτηση","yourAnswer":"Η απάντησή σας","correctAnswer":"Σωστή απάντηση"}');const c={en:{name:"English (EN)",translations:/*@__PURE__*/e(l)},el:{name:"Ελληνικά (EL)",translations:/*@__PURE__*/e(a)}},d=()=>s.getItem("lang")||"en",u=e=>{if(!c[e]){console.warn(`Language "${e}" not supported.`);return}s.setItem("lang",e),document.documentElement.setAttribute("lang",e)},h=(e,t,r=d())=>{c[r]||(r="en");let o=c[r]?.translations[e]||e;if(null!==t&&"object"==typeof t)for(let[e,r]of Object.entries(t))o=o.replaceAll(`{${e}}`,r);return o};var m={};m=new URL("logo.0a5e1a04.png",import.meta.url).toString();const p=`
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
`,g=t=>{let r=document.createElement("template");return r.innerHTML=`
    <style>${t}</style>

    <language-select></language-select>

    <form>
      <img src="${/*@__PURE__*/e(m)}" class="logo" alt="Quiz" width="120" height="120" aria-hidden="true">

      <h1>${h("chooseQuizType")}</h1>

      <div>
        <div>
          <input type="checkbox" name="sequential" id="sequential">
          <label for="sequential">${h("sequentialType")}</label>
        </div>

        <div>
          <input type="checkbox" name="multiple-choice" id="multiple-choice">
          <label for="multiple-choice">${h("multipleChoiceType")}</label>
        </div>
      </div>

      <button type="submit">${h("startQuizCTA")}</button>
    </form>
  `,r};class b extends HTMLElement{#e=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(g(p).content.cloneNode(!0))}connectedCallback(){this.#e=this.shadowRoot.querySelector("form"),this.#e.addEventListener("submit",this.#t),this.#e.addEventListener("change",this.#r);let e=s.getItem("options");e&&(this.#e.sequential.checked=e.sequential,this.#e["multiple-choice"].checked=e.multipleChoice)}disconnectedCallback(){this.#e.removeEventListener("submit",this.#t),this.#e.removeEventListener("change",this.#r)}#r=()=>{let e=this.#e.sequential.checked,t=this.#e["multiple-choice"].checked;s.setItem("options",{sequential:e,multipleChoice:t})};#t=e=>{e.preventDefault(),this.dispatchEvent(new CustomEvent("quiz-start",{bubbles:!0,composed:!0,detail:{sequential:e.target.sequential.checked,multipleChoice:e.target["multiple-choice"].checked}}))};static defineCustomElement(e="quiz-intro"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,b)}}var f={};f=new URL("star-icon.3c1e655e.svg",import.meta.url).toString();const w=`
  :host {
    display: grid;
    grid-template-areas: "header" "content";
    grid-template-rows: auto 1fr;
    width: 100%;
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

  #quiz {
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
  }

  header {
    grid-area: header;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding-block: 1rem;
    font-size: 1rem;
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

  button:focus-visible {
    outline-color: var(--outline-color);
  }

  form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--body-bg-color);
    padding: 2rem 1rem;
    border-radius: var(--border-radius);
    border: 2px solid var(--body-color);
  }

  form::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    background-color: var(--accent-light);
    transform: translate(-0.5rem, -0.5rem) rotate(-5deg) scale(1.05);
    z-index: -1;
  }

  form::after {
    content: "";
    position: absolute;
    top: -0.75rem;
    left: 1.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: coral;
    border-radius: 50%;
  }

  form > label {
    font-size: 3rem;
    font-weight: bold;
  }

  form > input {
    max-width: 8rem;
    border: 2px solid var(--body-color);
    border-radius: var(--border-radius);
    background-color: #ffffff;
    font-family: inherit;
    font-size: 2.55rem;
    font-weight: bold;
    color: inherit;
    text-align: center;
    opacity: 1;
  }

  form > input.correct {
    border-color: var(--success-color);
  }

  form > input.incorrect {
    border-color: var(--error-color);
  }

  form > input:focus-visible {
    outline-color: var(--outline-color);
  }

  details {
    font-size: 1rem;
  }

  details > summary {
    cursor: pointer;
  }

  details[open] > summary {
    margin-block-end: 0.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--body-color);
    background-color: var(--body-bg-color);
  }

  thead th {
    padding: 0.5rem 1rem;
    border-block-end: 1px solid var(--body-color);
    font-size: 0.9rem;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: color-mix(in srgb, var(--body-bg-color) 95%, var(--body-color));
  }

  td, th {
    padding: 0.75rem;
    border-block-end: 1px solid var(--body-color);
  }

  td:nth-child(2) {
    color: var(--error-color);
  }

  td:nth-child(3) {
    color: var(--success-color);
  }

  .multiple-choice:empty,
  :host(:not([multiple-choice])) .multiple-choice {
    display: none !important;
  }

  .multiple-choice {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-block-start: 1rem;
  }

  .multiple-choice > button {
    position: relative;
    min-width: 4rem;
    padding: 0.5rem 2rem;
    border-radius: 50rem;
    border: 2px solid var(--body-color);
    background-color: var(--btn-bg-color);
    color: var(--body-color);
    font-family: inherit;
    font-size: 1.2rem;
  }

  .multiple-choice > button.correct {
    background-color: var(--success-color);
    border-color: color-mix(in srgb, var(--success-color) 70%, var(--body-color));
    color: var(--body-bg-color);
  }

  .multiple-choice > button.incorrect {
    background-color: var(--error-color);
    border-color: color-mix(in srgb, var(--error-color) 70%, var(--body-color));
    color: var(--body-bg-color);
  }

  .quit-quiz-btn {
    padding: 0.25rem 0.75rem;
    border: 1px solid var(--btn-border-color);
    background-color: var(--btn-bg-color);
    color: var(--body-color);
    font-size: 0.9rem;
  }

  .feedback-container {
    position: relative;
    width: 100%;
  }

  .feedback {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    margin-block-start: 0.25rem;
    text-align: center;
    font-size: 1rem;
  }

  .feedback:empty {
    display: none !important;
  }

  .score-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.75rem;
    font-weight: 500;
    color: tomato;
  }

  .completion-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    font-size: 1.25rem;
    text-align: center;
    text-wrap: balance;
  }

  .completion-message .star {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.75rem;
  }

  .completion-message .score {
    font-size: 5rem;
    font-weight: 500;
    color: tomato;
  }

  progress {
    --stripe-light: var(--accent);
    --stripe-dark: color-mix(in srgb, var(--accent) 85%, var(--body-color));
    --prgress-stripe: repeating-linear-gradient(45deg, var(--stripe-light), var(--stripe-light) 10px, var(--stripe-dark) 10px, var(--stripe-dark) 20px);

    appearance: none;
    -webkit-appearance: none;
    width: 13rem;
    height: 1rem;
    border: 2px solid var(--body-color);
    border-radius: 50rem;
    background-color: var(--body-bg-color);
    overflow: hidden;
  }

  progress::-webkit-progress-bar {
    background-color: var(--body-bg-color);
    border-radius: 50rem;
  }

  progress::-webkit-progress-value {
    background: var(--accent);
    background: var(--prgress-stripe);
  }

  progress::-moz-progress-bar {
    background: var(--accent);
    background: var(--prgress-stripe);
  }

  @media (min-width: 1024px) {
    form > label {
      font-size: 4rem;
    }

    form > input {
      font-size: 3.55rem;
    }
  }
`,v=t=>{let r=document.createElement("template");return r.innerHTML=`
    <style>${t}</style>

    <header>
      <div class="score-container">
        <img src="${/*@__PURE__*/e(f)}" alt="Score" width="35" height="35">
        <span id="score"></span>
      </div>
      <progress id="progress"></progress>
      <button type="button" id="quitQuiz" class="quit-quiz-btn">${h("quitQuizCTA")}</button>
    </header>

    <div id="quiz">
      <form id="answerForm">
        <label for="answerInput" id="question">${h("loading")}</label>
        <input type="number" id="answerInput" required min="0" max="100">
      </form>

      <div id="multipleChoice" class="multiple-choice"></div>

      <div class="feedback-container">
        <div id="feedback" class="feedback"></div>
      </div>
    </div>
  `,r};class y extends HTMLElement{#o=[];#i=0;#n=0;#s=0;#l=-1;#a=new Set;#c=new Set;#d=null;#u=null;#h=null;#m=null;#p=null;#g=null;#b=null;#f=null;#w=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(v(w).content.cloneNode(!0))}get sequential(){return this.hasAttribute("sequential")}set sequential(e){this.toggleAttribute("sequential",!!e)}get multipleChoice(){return this.hasAttribute("multiple-choice")}set multipleChoice(e){this.toggleAttribute("multiple-choice",!!e)}connectedCallback(){this.#v("sequential"),this.#v("multipleChoice"),this.#u=this.shadowRoot.getElementById("answerForm"),this.#h=this.shadowRoot.getElementById("question"),this.#m=this.shadowRoot.getElementById("answerInput"),this.#p=this.shadowRoot.getElementById("feedback"),this.#g=this.shadowRoot.getElementById("score"),this.#b=this.shadowRoot.getElementById("progress"),this.#f=this.shadowRoot.getElementById("multipleChoice"),this.#w=this.shadowRoot.getElementById("quitQuiz"),this.#u.addEventListener("submit",this.#t),this.#f.addEventListener("click",this.#y),this.#w.addEventListener("click",this.#C),this.#E(),this.multipleChoice?(this.#m.setAttribute("disabled",""),this.#m.setAttribute("inert",""),this.#m.setAttribute("type","text")):this.#m.focus()}disconnectedCallback(){this.#u.removeEventListener("submit",this.#t),this.#f.removeEventListener("click",this.#y),this.#w.addEventListener("click",this.#C),null!==this.#d&&(clearTimeout(this.#d),this.#d=null)}#E(){this.#o=this.#x(),this.#n=this.#o.length,this.#q()}#t=e=>{e.preventDefault(),null===this.#d&&this.#k()};#y=e=>{let t=e.target.closest("button");null===this.#d&&t&&(this.#m.value=t.textContent,this.#k())};#z=()=>{this.dispatchEvent(new Event("quiz-restart",{bubbles:!0,composed:!0}))};#C=()=>{if(1===this.#s&&null===this.#d)return this.#z();confirm(h("quitQuizConfirm"))&&this.#z()};#x(){let e=[];for(let t=1;t<=10;t+=1)for(let r=1;r<=10;r+=1){let o=t*r;e.push({factor1:t,factor2:r,product:o})}return this.multipleChoice&&e.forEach(t=>{for(t.answerChoices=[t.product];t.answerChoices.length<3;){let r=e[Math.floor(Math.random()*e.length)].product;t.answerChoices.includes(r)||t.answerChoices.push(r)}t.answerChoices=function(e){if(!Array.isArray(e))throw TypeError("Expected an array for first argument");let t=[...e],r=t.length;for(;r;){let e=Math.random()*r--|0,o=t[r];t[r]=t[e],t[e]=o}return t}(t.answerChoices)}),e}#q(){this.sequential?this.#A():this.#Q(),this.#S(),this.#T()}#A(){this.#l+=1;let e=this.#o[this.#l];if(this.#l<this.#n){let{factor1:t,factor2:r}=e;this.#h.textContent=`${t} x ${r} =`,this.multipleChoice&&this.#L(e.answerChoices)}else document.startViewTransition?document.startViewTransition(()=>{this.#$()}):this.#$()}#Q(){let e;if(this.#a.size===this.#n){document.startViewTransition?document.startViewTransition(()=>{this.#$()}):this.#$();return}do this.#l=Math.floor(Math.random()*this.#n),e=this.#o[this.#l];while(this.#a.has(`${e.factor1}-${e.factor2}`))this.#a.add(`${e.factor1}-${e.factor2}`),this.#h.textContent=`${e.factor1} x ${e.factor2} =`,this.multipleChoice&&this.#L(e.answerChoices)}#L(e){this.#f.replaceChildren(),e.forEach(e=>{let t=document.createElement("button");t.setAttribute("data-answer",e),t.type="button",t.textContent=e,this.#f.appendChild(t)})}#k(){let e=parseInt(this.#m.value,10),t=this.#o[this.#l],r=t.product,o=750;if(this.multipleChoice){if(this.#f.setAttribute("inert",""),e===r)this.#f.querySelector(`button[data-answer="${r}"]`).classList.add("correct"),this.#m.classList.add("correct"),this.#i+=1;else{let i=this.#f.querySelector(`button[data-answer="${r}"]`),n=this.#f.querySelector(`button[data-answer="${e}"]`);i.classList.add("correct"),n.classList.add("incorrect"),this.#m.classList.add("incorrect"),o=1e3,this.#c.add({question:`${t.factor1} x ${t.factor2}`,userAnswer:e,correctAnswer:r})}}else this.#m.style.pointerEvents="none",e===r?(this.#p.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--success-color)" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg> ${h("correctFeedback")}
        `,this.#i+=1):(this.#p.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--error-color)" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
          </svg> ${h("incorrectFeedback",{correctAnswer:r})}
        `,o=1e3,this.#c.add({question:`${t.factor1} x ${t.factor2}`,userAnswer:e,correctAnswer:r}));this.#S(),this.#d=setTimeout(()=>{this.#m.value="",this.#m.focus(),this.#q(),this.#d=null,this.multipleChoice?(this.#f.removeAttribute("inert"),this.#m.classList.remove("correct","incorrect"),this.#f.querySelectorAll("button").forEach(e=>{e.classList.remove("correct","incorrect")})):(this.#m.style.pointerEvents="auto",this.#p.replaceChildren())},o)}#S(){this.#g.textContent=this.#i}#T(){this.#s+=1,this.#b.value=this.#s/this.#n}#$(){this.shadowRoot.getElementById("quiz").innerHTML=`
      <div class="completion-message">
        <div class="star">
          <img src="${/*@__PURE__*/e(f)}" alt="Score" width="50" height="50" aria-hidden="true">
          ${h("score")}
        </div>

        <div class="score">
          ${this.#i}
        </div>

        ${this.#c.size>0?`
              ${h("notAllCorrectMessage")}
              <details>
                <summary>${h("viewIncorrectAnswers")}</summary>

                <table>
                  <thead>
                    <tr>
                      <th>${h("question")}</th>
                      <th>${h("yourAnswer")}</th>
                      <th>${h("correctAnswer")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${[...this.#c].map(({question:e,userAnswer:t,correctAnswer:r})=>`
                          <tr>
                            <td>${e}</td>
                            <td>${t}</td>
                            <td>${r}</td>
                          </tr>
                        `).join("")}
                  </tbody>
                </table>
              </details>
            `:`\u{1F389} ${h("allCorrectMessage")}`}

        <button id="restartQuiz">${h("startOverCTA")}</button>
      </div>
    `,this.shadowRoot.querySelector("header").setAttribute("hidden",""),this.#S();let t=this.shadowRoot.getElementById("restartQuiz");t?.addEventListener("click",this.#z,{once:!0})}#v(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}static defineCustomElement(e="multiply-quiz"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,y)}}const C=`
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
`,E=document.createElement("template");E.innerHTML=`
  <style>${C}</style>
  <select></select>
`;class x extends HTMLElement{#I=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(E.content.cloneNode(!0))}connectedCallback(){this.#I=this.shadowRoot.querySelector("select");let e=d();Object.entries(c).forEach(([t,r])=>{let o=document.createElement("option");o.value=t,o.textContent=r.name,o.selected=t===e,this.#I.appendChild(o)}),this.#I.addEventListener("change",this.#M)}disconnectedCallback(){this.#I.removeEventListener("change",this.#M)}#M=e=>{this.dispatchEvent(new CustomEvent("language-change",{bubbles:!0,composed:!0,detail:{language:e.target.value||"en"}}))};static defineCustomElement(e="language-select"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,x)}}const q=document.querySelector("main");document.documentElement.setAttribute("lang",d()),document.addEventListener("quiz-start",function(e){let t=document.querySelector("quiz-intro"),r=document.createElement("multiply-quiz"),o=e.detail.sequential,i=e.detail.multipleChoice;o&&r?.setAttribute("sequential",""),i&&r?.setAttribute("multiple-choice",""),document.startViewTransition?document.startViewTransition(()=>{t?.remove(),q?.appendChild(r)}):(t?.remove(),q?.appendChild(r))}),document.addEventListener("quiz-restart",function(){let e=document.querySelector("multiply-quiz");e&&(document.startViewTransition?document.startViewTransition(()=>{e?.remove(),q?.appendChild(document.createElement("quiz-intro"))}):(e?.remove(),q?.appendChild(document.createElement("quiz-intro"))))}),document.addEventListener("language-change",function(e){u(e.detail.language);let t=document.querySelector("quiz-intro");t&&(t.remove(),q?.appendChild(document.createElement("quiz-intro")))}),window.visualViewport.addEventListener("resize",function(){document.documentElement.style.height=`${window.visualViewport.height}px`}),b.defineCustomElement(),y.defineCustomElement(),x.defineCustomElement();
//# sourceMappingURL=index.a91f502a.js.map
