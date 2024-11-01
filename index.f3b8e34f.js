!function(){function e(e,t,r,o){Object.defineProperty(e,t,{get:r,set:o,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},i={},n=r.parcelRequireed01;null==n&&((n=function(e){if(e in o)return o[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},r.parcelRequireed01=n);var s=n.register;s("iE7OH",function(t,r){e(t.exports,"register",function(){return o},function(e){return o=e});var o,i=new Map;o=function(e,t){for(var r=0;r<t.length-1;r+=2)i.set(t[r],{baseUrl:e,path:t[r+1]})}}),s("aNJCr",function(t,r){e(t.exports,"getBundleURL",function(){return o},function(e){return o=e});var o,i={};o=function(e){var t=i[e];return t||(t=function(){try{throw Error()}catch(t){var e=(""+t.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return(""+e[2]).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}return"/"}(),i[e]=t),t}}),n("iE7OH").register(n("aNJCr").getBundleURL("9p9yL"),JSON.parse('["9p9yL","index.f3b8e34f.js","83LPa","logo-light.50757842.png","cegw3","logo-dark.33c21a11.png","gHlXF","celebration.228925ff.png","jm0TH","index.d928e10b.css"]'));let l="multiply-quiz",a=new class{constructor(e="local"){this.storage="local"===e?localStorage:sessionStorage}getItem(e){try{return JSON.parse(this.storage.getItem(`${l}/${e}`))}catch{return null}}setItem(e,t){try{this.storage.setItem(`${l}/${e}`,JSON.stringify(t))}catch{}}};var c={};c=JSON.parse('{"loading":"Loading...","chooseQuizType":"Choose a quiz type","sequentialType":"In order (random by default)","multipleChoiceType":"Multiple Choice","startQuizCTA":"Start Quiz","quitQuizCTA":"Quit Quiz","startOverCTA":"Start Over","quitQuizConfirm":"Quit the quiz? Your progress will be lost.","score":"Score","correctFeedback":"Correct!","incorrectFeedback":"Incorrect! The correct answer is {correctAnswer}.","completionMessage":"Congratulations! You\'ve completed all questions.","completionMessageScore":"Your score is {score}.","viewIncorrectAnswers":"View incorrect answers","question":"Question","yourAnswer":"Your Answer","correctAnswer":"Correct Answer"}');var u={};u=JSON.parse('{"loading":"Φόρτωση...","chooseQuizType":"Επιλέξτε τύπο κουίζ","sequentialType":"Σε σειρά (τυχαίο από προεπιλογή)","multipleChoiceType":"Πολλαπλής Επιλογής","startQuizCTA":"Έναρξη Κουίζ","quitQuizCTA":"Διακοπή Κουίζ","startOverCTA":"Επανεκκίνηση","quitQuizConfirm":"Διακοπή του κουίζ; Η πρόοδός σας θα χαθεί.","score":"Σκορ","correctFeedback":"Σωστό!","incorrectFeedback":"Λάθος! Η σωστή απάντηση είναι {correctAnswer}.","completionMessage":"Συγχαρητήρια! Ολοκληρώσατε όλες τις ερωτήσεις.","completionMessageScore":"Το σκορ σας είναι {score}.","viewIncorrectAnswers":"Προβολή λανθασμένων απαντήσεων","question":"Ερώτηση","yourAnswer":"Η απάντησή σας","correctAnswer":"Σωστή απάντηση"}');let d={en:{name:"English (EN)",translations:/*@__PURE__*/t(c)},el:{name:"Ελληνικά (EL)",translations:/*@__PURE__*/t(u)}},h=()=>a.getItem("lang")||"en",m=e=>{if(!d[e]){console.warn(`Language "${e}" not supported.`);return}a.setItem("lang",e),document.documentElement.setAttribute("lang",e)},p=(e,t,r=h())=>{d[r]||(r="en");let o=d[r]?.translations[e]||e;if(null!==t&&"object"==typeof t)for(let[e,r]of Object.entries(t))o=o.replaceAll(`{${e}}`,r);return o};var g={};g=n("aNJCr").getBundleURL("9p9yL")+"logo-light.50757842.png";var f={};f=n("aNJCr").getBundleURL("9p9yL")+"logo-dark.33c21a11.png";let b=`
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
`,w=e=>{let r=document.createElement("template");return r.innerHTML=`
    <style>${e}</style>

    <language-select></language-select>

    <form>
      <picture>
        <source srcset="${/*@__PURE__*/t(g)}" media="(prefers-color-scheme: dark)">
        <source srcset="${/*@__PURE__*/t(f)}" media="(prefers-color-scheme: light)">
        <img src="${/*@__PURE__*/t(f)}" alt="Quiz" width="120" height="120" aria-hidden="true">
      </picture>

      <h1>${p("chooseQuizType")}</h1>

      <div>
        <div>
          <input type="checkbox" name="sequential" id="sequential">
          <label for="sequential">${p("sequentialType")}</label>
        </div>

        <div>
          <input type="checkbox" name="multiple-choice" id="multiple-choice">
          <label for="multiple-choice">${p("multipleChoiceType")}</label>
        </div>
      </div>

      <button type="submit">${p("startQuizCTA")}</button>
    </form>
  `,r};class v extends HTMLElement{#e=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(w(b).content.cloneNode(!0))}connectedCallback(){this.#e=this.shadowRoot.querySelector("form"),this.#e.addEventListener("submit",this.#t),this.#e.addEventListener("change",this.#r);let e=a.getItem("options");e&&(this.#e.sequential.checked=e.sequential,this.#e["multiple-choice"].checked=e.multipleChoice)}disconnectedCallback(){this.#e.removeEventListener("submit",this.#t),this.#e.removeEventListener("change",this.#r)}#r=()=>{let e=this.#e.sequential.checked,t=this.#e["multiple-choice"].checked;a.setItem("options",{sequential:e,multipleChoice:t})};#t=e=>{e.preventDefault(),this.dispatchEvent(new CustomEvent("quiz-start",{bubbles:!0,composed:!0,detail:{sequential:e.target.sequential.checked,multipleChoice:e.target["multiple-choice"].checked}}))};static defineCustomElement(e="quiz-intro"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,v)}}var y={};y=n("aNJCr").getBundleURL("9p9yL")+"celebration.228925ff.png";let C=`
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
`,E=e=>{let t=document.createElement("template");return t.innerHTML=`
    <style>${e}</style>

    <header>
      <div id="score"></div>
      <progress id="progress"></progress>
      <button type="button" id="quitQuiz" class="quit-quiz-btn">${p("quitQuizCTA")}</button>
    </header>

    <div id="quiz">
      <form id="answerForm">
        <label for="answerInput" id="question">${p("loading")}</label>
        <input type="number" id="answerInput" required min="0" max="100">
      </form>

      <div id="multipleChoice" class="multiple-choice"></div>

      <div class="feedback-container">
        <div id="feedback" class="feedback"></div>
      </div>
    </div>
  `,t};class x extends HTMLElement{#o=[];#i=0;#n=0;#s=0;#l=-1;#a=new Set;#c=new Set;#u=null;#d=null;#h=null;#m=null;#p=null;#g=null;#f=null;#b=null;#w=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(E(C).content.cloneNode(!0))}get sequential(){return this.hasAttribute("sequential")}set sequential(e){this.toggleAttribute("sequential",!!e)}get multipleChoice(){return this.hasAttribute("multiple-choice")}set multipleChoice(e){this.toggleAttribute("multiple-choice",!!e)}connectedCallback(){this.#v("sequential"),this.#v("multipleChoice"),this.#d=this.shadowRoot.getElementById("answerForm"),this.#h=this.shadowRoot.getElementById("question"),this.#m=this.shadowRoot.getElementById("answerInput"),this.#p=this.shadowRoot.getElementById("feedback"),this.#g=this.shadowRoot.getElementById("score"),this.#f=this.shadowRoot.getElementById("progress"),this.#b=this.shadowRoot.getElementById("multipleChoice"),this.#w=this.shadowRoot.getElementById("quitQuiz"),this.#d.addEventListener("submit",this.#t),this.#b.addEventListener("click",this.#y),this.#w.addEventListener("click",this.#C),this.#E(),this.multipleChoice?(this.#m.setAttribute("disabled",""),this.#m.setAttribute("inert",""),this.#m.setAttribute("type","text")):this.#m.focus()}disconnectedCallback(){this.#d.removeEventListener("submit",this.#t),this.#b.removeEventListener("click",this.#y),this.#w.addEventListener("click",this.#C),null!==this.#u&&(clearTimeout(this.#u),this.#u=null)}#E(){this.#o=this.#x(),this.#n=this.#o.length,this.#q()}#t=e=>{e.preventDefault(),null===this.#u&&this.#z()};#y=e=>{let t=e.target.closest("button");null===this.#u&&t&&(this.#m.value=t.textContent,this.#z())};#k=()=>{this.dispatchEvent(new Event("quiz-restart",{bubbles:!0,composed:!0}))};#C=()=>{if(1===this.#s&&null===this.#u)return this.#k();confirm(p("quitQuizConfirm"))&&this.#k()};#x(){let e=[];for(let t=1;t<=10;t+=1)for(let r=1;r<=10;r+=1){let o=t*r;e.push({factor1:t,factor2:r,product:o})}return this.multipleChoice&&e.forEach(t=>{for(t.answerChoices=[t.product];t.answerChoices.length<3;){let r=e[Math.floor(Math.random()*e.length)].product;t.answerChoices.includes(r)||t.answerChoices.push(r)}t.answerChoices=function(e){if(!Array.isArray(e))throw TypeError("Expected an array for first argument");let t=[...e],r=t.length;for(;r;){let e=Math.random()*r--|0,o=t[r];t[r]=t[e],t[e]=o}return t}(t.answerChoices)}),e}#q(){this.sequential?this.#A():this.#L(),this.#Q(),this.#$()}#A(){this.#l+=1;let e=this.#o[this.#l];if(this.#l<this.#n){let{factor1:t,factor2:r}=e;this.#h.textContent=`${t} x ${r} =`,this.multipleChoice&&this.#S(e.answerChoices)}else this.#I()}#L(){let e;if(this.#a.size===this.#n){this.#I();return}do this.#l=Math.floor(Math.random()*this.#n),e=this.#o[this.#l];while(this.#a.has(`${e.factor1}-${e.factor2}`))this.#a.add(`${e.factor1}-${e.factor2}`),this.#h.textContent=`${e.factor1} x ${e.factor2} =`,this.multipleChoice&&this.#S(e.answerChoices)}#S(e){this.#b.replaceChildren(),e.forEach(e=>{let t=document.createElement("button");t.setAttribute("data-answer",e),t.type="button",t.textContent=e,this.#b.appendChild(t)})}#z(){let e=parseInt(this.#m.value,10),t=this.#o[this.#l],r=t.product,o=1e3;if(this.multipleChoice){if(this.#b.setAttribute("inert",""),e===r)this.#b.querySelector(`button[data-answer="${r}"]`).classList.add("correct"),this.#m.classList.add("correct"),this.#i+=1;else{let i=this.#b.querySelector(`button[data-answer="${r}"]`),n=this.#b.querySelector(`button[data-answer="${e}"]`);i.classList.add("correct"),n.classList.add("incorrect"),this.#m.classList.add("incorrect"),o=2e3,this.#c.add({question:`${t.factor1} x ${t.factor2}`,userAnswer:e,correctAnswer:r})}}else this.#m.style.pointerEvents="none",e===r?(this.#p.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--success-color)" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg> ${p("correctFeedback")}
        `,this.#i+=1):(this.#p.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--error-color)" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
          </svg> ${p("incorrectFeedback",{correctAnswer:r})}
        `,o=2e3,this.#c.add({question:`${t.factor1} x ${t.factor2}`,userAnswer:e,correctAnswer:r}));this.#Q(),this.#u=setTimeout(()=>{this.#m.value="",this.#m.focus(),this.#q(),this.#u=null,this.multipleChoice?(this.#b.removeAttribute("inert"),this.#m.classList.remove("correct","incorrect"),this.#b.querySelectorAll("button").forEach(e=>{e.classList.remove("correct","incorrect")})):(this.#m.style.pointerEvents="auto",this.#p.replaceChildren())},o)}#Q(){let e=(this.#i/this.#s*100||0).toFixed(0);this.#g.textContent=`${p("score")}: ${this.#i} / ${this.#s} (${e}%)`}#$(){this.#s+=1,this.#f.value=this.#s/this.#n}#I(){this.shadowRoot.getElementById("quiz").innerHTML=`
      <div class="completion-message">
        <img src="${/*@__PURE__*/t(y)}" alt="Celebration" width="125" height="121" aria-hidden="true">
        ${p("completionMessage")}
        <br>
        ${p("completionMessageScore",{score:`${this.#i} / ${this.#n}`})}

        ${this.#c.size>0?`
              <details>
                <summary>${p("viewIncorrectAnswers")}</summary>

                <table>
                  <thead>
                    <tr>
                      <th>${p("question")}</th>
                      <th>${p("yourAnswer")}</th>
                      <th>${p("correctAnswer")}</th>
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
            `:""}

        <button id="restartQuiz">${p("startOverCTA")}</button>
      </div>
    `,this.shadowRoot.querySelector("header").setAttribute("hidden",""),this.#Q();let e=this.shadowRoot.getElementById("restartQuiz");e?.addEventListener("click",this.#k,{once:!0})}#v(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}static defineCustomElement(e="multiply-quiz"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,x)}}let q=`
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
`,z=document.createElement("template");z.innerHTML=`
  <style>${q}</style>
  <select></select>
`;class k extends HTMLElement{#T=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(z.content.cloneNode(!0))}connectedCallback(){this.#T=this.shadowRoot.querySelector("select");let e=h();Object.entries(d).forEach(([t,r])=>{let o=document.createElement("option");o.value=t,o.textContent=r.name,o.selected=t===e,this.#T.appendChild(o)}),this.#T.addEventListener("change",this.#M)}disconnectedCallback(){this.#T.removeEventListener("change",this.#M)}#M=e=>{this.dispatchEvent(new CustomEvent("language-change",{bubbles:!0,composed:!0,detail:{language:e.target.value||"en"}}))};static defineCustomElement(e="language-select"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,k)}}let A=document.querySelector("main");document.documentElement.setAttribute("lang",h()),document.addEventListener("quiz-start",function(e){let t=document.querySelector("quiz-intro"),r=document.createElement("multiply-quiz"),o=e.detail.sequential,i=e.detail.multipleChoice;o&&r?.setAttribute("sequential",""),i&&r?.setAttribute("multiple-choice",""),A?.appendChild(r),t?.remove()}),document.addEventListener("quiz-restart",function(){let e=document.querySelector("multiply-quiz");e&&(e?.remove(),A?.appendChild(document.createElement("quiz-intro")))}),document.addEventListener("language-change",function(e){m(e.detail.language);let t=document.querySelector("quiz-intro");t&&(t.remove(),A?.appendChild(document.createElement("quiz-intro")))}),window.visualViewport.addEventListener("resize",function(){document.documentElement.style.height=`${window.visualViewport.height}px`}),v.defineCustomElement(),x.defineCustomElement(),k.defineCustomElement()}();
//# sourceMappingURL=index.f3b8e34f.js.map
