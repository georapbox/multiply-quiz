function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},i=t.parcelRequireed01;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return o[e]=i,t.call(i.exports,i,i.exports),i.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){r[e]=t},t.parcelRequireed01=i),(0,i.register)("kyEFX",function(e,t){Object.defineProperty(e.exports,"register",{get:function(){return o},set:function(e){return o=e},enumerable:!0,configurable:!0});var o,r=new Map;o=function(e,t){for(var o=0;o<t.length-1;o+=2)r.set(t[o],{baseUrl:e,path:t[o+1]})}}),i("kyEFX").register(new URL("",import.meta.url).toString(),JSON.parse('["7bk21","index.f7395e3d.js","dADNf","logo-light.50757842.png","9hXMK","logo-dark.33c21a11.png","ddvcB","celebration.228925ff.png"]'));const n="multiply-quiz",s=new class{constructor(e="local"){this.storage="local"===e?localStorage:sessionStorage}getItem(e){try{return JSON.parse(this.storage.getItem(`${n}/${e}`))}catch{return null}}setItem(e,t){try{this.storage.setItem(`${n}/${e}`,JSON.stringify(t))}catch{}}};var l={};l=JSON.parse('{"loading":"Loading...","chooseQuizType":"Choose a quiz type","sequentialType":"In order (random by default)","multipleChoiceType":"Multiple Choice","startQuizCTA":"Start Quiz","quitQuizCTA":"Quit Quiz","startOverCTA":"Start Over","quitQuizConfirm":"Quit the quiz? Your progress will be lost.","score":"Score","correctFeedback":"Correct!","incorrectFeedback":"Incorrect! The correct answer is {correctAnswer}.","completionMessage":"Congratulations! You\'ve completed all questions.","completionMessageScore":"Your score is {score}.","viewIncorrectAnswers":"View incorrect answers","question":"Question","yourAnswer":"Your Answer","correctAnswer":"Correct Answer"}');var a={};a=JSON.parse('{"loading":"Φόρτωση...","chooseQuizType":"Επιλέξτε τύπο κουίζ","sequentialType":"Σε σειρά (τυχαίο από προεπιλογή)","multipleChoiceType":"Πολλαπλής Επιλογής","startQuizCTA":"Έναρξη Κουίζ","quitQuizCTA":"Διακοπή Κουίζ","startOverCTA":"Επανεκκίνηση","quitQuizConfirm":"Διακοπή του κουίζ; Η πρόοδός σας θα χαθεί.","score":"Σκορ","correctFeedback":"Σωστό!","incorrectFeedback":"Λάθος! Η σωστή απάντηση είναι {correctAnswer}.","completionMessage":"Συγχαρητήρια! Ολοκληρώσατε όλες τις ερωτήσεις.","completionMessageScore":"Το σκορ σας είναι {score}.","viewIncorrectAnswers":"Προβολή λανθασμένων απαντήσεων","question":"Ερώτηση","yourAnswer":"Η απάντησή σας","correctAnswer":"Σωστή απάντηση"}');const c={en:{name:"English (EN)",translations:/*@__PURE__*/e(l)},el:{name:"Ελληνικά (EL)",translations:/*@__PURE__*/e(a)}},u=()=>s.getItem("lang")||"en",d=e=>{if(!c[e]){console.warn(`Language "${e}" not supported.`);return}s.setItem("lang",e),document.documentElement.setAttribute("lang",e)},h=(e,t,o=u())=>{c[o]||(o="en");let r=c[o]?.translations[e]||e;if(null!==t&&"object"==typeof t)for(let[e,o]of Object.entries(t))r=r.replaceAll(`{${e}}`,o);return r};var m={};m=new URL("logo-light.50757842.png",import.meta.url).toString();var p={};p=new URL("logo-dark.33c21a11.png",import.meta.url).toString();const g=`
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
    background-color: var(--body-color);
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
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 1rem;
    row-gap: 0.5rem;
  }
`,b=t=>{let o=document.createElement("template");return o.innerHTML=`
    <style>${t}</style>

    <language-select></language-select>

    <form>
      <picture>
        <source srcset="${/*@__PURE__*/e(m)}" media="(prefers-color-scheme: dark)">
        <source srcset="${/*@__PURE__*/e(p)}" media="(prefers-color-scheme: light)">
        <img src="${/*@__PURE__*/e(p)}" alt="Quiz" width="120" height="120" aria-hidden="true">
      </picture>

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
  `,o};class f extends HTMLElement{#e=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(b(g).content.cloneNode(!0))}connectedCallback(){this.#e=this.shadowRoot.querySelector("form"),this.#e.addEventListener("submit",this.#t),this.#e.addEventListener("change",this.#o);let e=s.getItem("options");e&&(this.#e.sequential.checked=e.sequential,this.#e["multiple-choice"].checked=e.multipleChoice)}disconnectedCallback(){this.#e.removeEventListener("submit",this.#t),this.#e.removeEventListener("change",this.#o)}#o=()=>{let e=this.#e.sequential.checked,t=this.#e["multiple-choice"].checked;s.setItem("options",{sequential:e,multipleChoice:t})};#t=e=>{e.preventDefault(),this.dispatchEvent(new CustomEvent("quiz-start",{bubbles:!0,composed:!0,detail:{sequential:e.target.sequential.checked,multipleChoice:e.target["multiple-choice"].checked}}))};static defineCustomElement(e="quiz-intro"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,f)}}var w={};w=new URL("celebration.228925ff.png",import.meta.url).toString();const v=`
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
    background-color: var(--body-color);
    color: var(--body-bg-color);
    border: none;
    border-radius: var(--border-radius);
    padding: 0.75rem 1.25rem;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
  }

  button:focus-visible {
    outline-color: var(--outline-color);
  }

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  form > label {
    font-size: 3rem;
    font-weight: bold;
  }

  form > input {
    max-width: 8rem;
    border: 2px solid var(--body-color);
    border-radius: var(--border-radius);
    background-color: transparent;
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
  }

  thead th {
    padding: 0.5rem 1rem;
    border-block-end: 2px solid var(--body-color);
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
    min-width: 4rem;
    padding: 0.5rem 2rem;
    border-radius: 50rem;
    border: 2px solid var(--body-color);
    background-color: transparent;
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
    border: 1px solid var(--error-color);
    background-color: transparent;
    color: var(--error-color);
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

  .completion-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    font-size: calc(1.1rem + 1vw);
    text-align: center;
    text-wrap: balance;
  }

  .completion-message img {
    border-radius: 50%;
    border: 5px solid var(--body-color);
  }

  @media (min-width: 1024px) {
    form > label {
      font-size: 4rem;
    }

    form > input {
      font-size: 3.55rem;
    }
  }
`,y=e=>{let t=document.createElement("template");return t.innerHTML=`
    <style>${e}</style>

    <header>
      <div id="score"></div>
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
  `,t};class C extends HTMLElement{#r=[];#i=0;#n=0;#s=0;#l=-1;#a=new Set;#c=new Set;#u=null;#d=null;#h=null;#m=null;#p=null;#g=null;#b=null;#f=null;#w=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(y(v).content.cloneNode(!0))}get sequential(){return this.hasAttribute("sequential")}set sequential(e){this.toggleAttribute("sequential",!!e)}get multipleChoice(){return this.hasAttribute("multiple-choice")}set multipleChoice(e){this.toggleAttribute("multiple-choice",!!e)}connectedCallback(){this.#v("sequential"),this.#v("multipleChoice"),this.#d=this.shadowRoot.getElementById("answerForm"),this.#h=this.shadowRoot.getElementById("question"),this.#m=this.shadowRoot.getElementById("answerInput"),this.#p=this.shadowRoot.getElementById("feedback"),this.#g=this.shadowRoot.getElementById("score"),this.#b=this.shadowRoot.getElementById("progress"),this.#f=this.shadowRoot.getElementById("multipleChoice"),this.#w=this.shadowRoot.getElementById("quitQuiz"),this.#d.addEventListener("submit",this.#t),this.#f.addEventListener("click",this.#y),this.#w.addEventListener("click",this.#C),this.#E(),this.multipleChoice?(this.#m.setAttribute("disabled",""),this.#m.setAttribute("inert",""),this.#m.setAttribute("type","text")):this.#m.focus()}disconnectedCallback(){this.#d.removeEventListener("submit",this.#t),this.#f.removeEventListener("click",this.#y),this.#w.addEventListener("click",this.#C),null!==this.#u&&(clearTimeout(this.#u),this.#u=null)}#E(){this.#r=this.#x(),this.#n=this.#r.length,this.#q()}#t=e=>{e.preventDefault(),null===this.#u&&this.#k()};#y=e=>{let t=e.target.closest("button");null===this.#u&&t&&(this.#m.value=t.textContent,this.#k())};#z=()=>{this.dispatchEvent(new Event("quiz-restart",{bubbles:!0,composed:!0}))};#C=()=>{if(1===this.#s&&null===this.#u)return this.#z();confirm(h("quitQuizConfirm"))&&this.#z()};#x(){let e=[];for(let t=1;t<=10;t+=1)for(let o=1;o<=10;o+=1){let r=t*o;e.push({factor1:t,factor2:o,product:r})}return this.multipleChoice&&e.forEach(t=>{for(t.answerChoices=[t.product];t.answerChoices.length<3;){let o=e[Math.floor(Math.random()*e.length)].product;t.answerChoices.includes(o)||t.answerChoices.push(o)}t.answerChoices=function(e){if(!Array.isArray(e))throw TypeError("Expected an array for first argument");let t=[...e],o=t.length;for(;o;){let e=Math.random()*o--|0,r=t[o];t[o]=t[e],t[e]=r}return t}(t.answerChoices)}),e}#q(){this.sequential?this.#A():this.#Q(),this.#S(),this.#L()}#A(){this.#l+=1;let e=this.#r[this.#l];if(this.#l<this.#n){let{factor1:t,factor2:o}=e;this.#h.textContent=`${t} x ${o} =`,this.multipleChoice&&this.#$(e.answerChoices)}else this.#I()}#Q(){let e;if(this.#a.size===this.#n){this.#I();return}do this.#l=Math.floor(Math.random()*this.#n),e=this.#r[this.#l];while(this.#a.has(`${e.factor1}-${e.factor2}`))this.#a.add(`${e.factor1}-${e.factor2}`),this.#h.textContent=`${e.factor1} x ${e.factor2} =`,this.multipleChoice&&this.#$(e.answerChoices)}#$(e){this.#f.replaceChildren(),e.forEach(e=>{let t=document.createElement("button");t.setAttribute("data-answer",e),t.type="button",t.textContent=e,this.#f.appendChild(t)})}#k(){let e=parseInt(this.#m.value,10),t=this.#r[this.#l],o=t.product,r=1e3;if(this.multipleChoice){if(this.#f.setAttribute("inert",""),e===o)this.#f.querySelector(`button[data-answer="${o}"]`).classList.add("correct"),this.#m.classList.add("correct"),this.#i+=1;else{let i=this.#f.querySelector(`button[data-answer="${o}"]`),n=this.#f.querySelector(`button[data-answer="${e}"]`);i.classList.add("correct"),n.classList.add("incorrect"),this.#m.classList.add("incorrect"),r=2e3,this.#c.add({question:`${t.factor1} x ${t.factor2}`,userAnswer:e,correctAnswer:o})}}else this.#m.style.pointerEvents="none",e===o?(this.#p.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--success-color)" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg> ${h("correctFeedback")}
        `,this.#i+=1):(this.#p.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--error-color)" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
          </svg> ${h("incorrectFeedback",{correctAnswer:o})}
        `,r=2e3,this.#c.add({question:`${t.factor1} x ${t.factor2}`,userAnswer:e,correctAnswer:o}));this.#S(),this.#u=setTimeout(()=>{this.#m.value="",this.#m.focus(),this.#q(),this.#u=null,this.multipleChoice?(this.#f.removeAttribute("inert"),this.#m.classList.remove("correct","incorrect"),this.#f.querySelectorAll("button").forEach(e=>{e.classList.remove("correct","incorrect")})):(this.#m.style.pointerEvents="auto",this.#p.replaceChildren())},r)}#S(){let e=(this.#i/this.#s*100||0).toFixed(0);this.#g.textContent=`${h("score")}: ${this.#i} / ${this.#s} (${e}%)`}#L(){this.#s+=1,this.#b.value=this.#s/this.#n}#I(){this.shadowRoot.getElementById("quiz").innerHTML=`
      <div class="completion-message">
        <img src="${/*@__PURE__*/e(w)}" alt="Celebration" width="125" height="121" aria-hidden="true">
        ${h("completionMessage")}
        <br>
        ${h("completionMessageScore",{score:`${this.#i} / ${this.#n}`})}

        ${this.#c.size>0?`
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
                    ${[...this.#c].map(({question:e,userAnswer:t,correctAnswer:o})=>`
                          <tr>
                            <td>${e}</td>
                            <td>${t}</td>
                            <td>${o}</td>
                          </tr>
                        `).join("")}
                  </tbody>
                </table>
              </details>
            `:""}

        <button id="restartQuiz">${h("startOverCTA")}</button>
      </div>
    `,this.shadowRoot.querySelector("header").setAttribute("hidden",""),this.#S();let t=this.shadowRoot.getElementById("restartQuiz");t?.addEventListener("click",this.#z,{once:!0})}#v(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}static defineCustomElement(e="multiply-quiz"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,C)}}const E=`
  :host {
    --select-arrow: url("data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='62.5' width='116.9' fill='%23161f27'%3E %3Cpath d='M115.3,1.6 C113.7,0 111.1,0 109.5,1.6 L58.5,52.7 L7.4,1.6 C5.8,0 3.2,0 1.6,1.6 C0,3.2 0,5.8 1.6,7.4 L55.5,61.3 C56.3,62.1 57.3,62.5 58.4,62.5 C59.4,62.5 60.5,62.1 61.3,61.3 L115.2,7.4 C116.9,5.8 116.9,3.2 115.3,1.6Z'/%3E %3C/svg%3E");

    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --select-arrow: url("data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='62.5' width='116.9' fill='%23ffffff'%3E %3Cpath d='M115.3,1.6 C113.7,0 111.1,0 109.5,1.6 L58.5,52.7 L7.4,1.6 C5.8,0 3.2,0 1.6,1.6 C0,3.2 0,5.8 1.6,7.4 L55.5,61.3 C56.3,62.1 57.3,62.5 58.4,62.5 C59.4,62.5 60.5,62.1 61.3,61.3 L115.2,7.4 C116.9,5.8 116.9,3.2 115.3,1.6Z'/%3E %3C/svg%3E");
    }
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
    border: 1px solid var(--body-color);
    padding-block: 0.25rem;
    padding-inline: 0.5rem 2rem;
    border-radius: var(--border-radius);
    background: var(--body-bg-color) var(--select-arrow) calc(100% - 0.5rem) 50% / 0.75rem no-repeat;
    appearance: none;
    -webkit-appearance: none;
  }
`,x=document.createElement("template");x.innerHTML=`
  <style>${E}</style>
  <select></select>
`;class q extends HTMLElement{#T=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(x.content.cloneNode(!0))}connectedCallback(){this.#T=this.shadowRoot.querySelector("select");let e=u();Object.entries(c).forEach(([t,o])=>{let r=document.createElement("option");r.value=t,r.textContent=o.name,r.selected=t===e,this.#T.appendChild(r)}),this.#T.addEventListener("change",this.#M)}disconnectedCallback(){this.#T.removeEventListener("change",this.#M)}#M=e=>{this.dispatchEvent(new CustomEvent("language-change",{bubbles:!0,composed:!0,detail:{language:e.target.value||"en"}}))};static defineCustomElement(e="language-select"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,q)}}const k=document.querySelector("main");document.documentElement.setAttribute("lang",u()),document.addEventListener("quiz-start",function(e){let t=document.querySelector("quiz-intro"),o=document.createElement("multiply-quiz"),r=e.detail.sequential,i=e.detail.multipleChoice;r&&o?.setAttribute("sequential",""),i&&o?.setAttribute("multiple-choice",""),k?.appendChild(o),t?.remove()}),document.addEventListener("quiz-restart",function(){let e=document.querySelector("multiply-quiz");e&&(e?.remove(),k?.appendChild(document.createElement("quiz-intro")))}),document.addEventListener("language-change",function(e){d(e.detail.language);let t=document.querySelector("quiz-intro");t&&(t.remove(),k?.appendChild(document.createElement("quiz-intro")))}),window.visualViewport.addEventListener("resize",function(){document.documentElement.style.height=`${window.visualViewport.height}px`}),f.defineCustomElement(),C.defineCustomElement(),q.defineCustomElement();
//# sourceMappingURL=index.f7395e3d.js.map
