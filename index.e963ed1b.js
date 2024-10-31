function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},o={},r=t.parcelRequireed01;null==r&&((r=function(e){if(e in i)return i[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return i[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){o[e]=t},t.parcelRequireed01=r),(0,r.register)("kyEFX",function(e,t){Object.defineProperty(e.exports,"register",{get:function(){return i},set:function(e){return i=e},enumerable:!0,configurable:!0});var i,o=new Map;i=function(e,t){for(var i=0;i<t.length-1;i+=2)o.set(t[i],{baseUrl:e,path:t[i+1]})}}),r("kyEFX").register(new URL("",import.meta.url).toString(),JSON.parse('["7bk21","index.e963ed1b.js","dADNf","logo-light.50757842.png","9hXMK","logo-dark.33c21a11.png","ddvcB","celebration.228925ff.png"]'));const s="multiply-quiz",n=new class{constructor(e="session"){this.storage="local"===e?localStorage:sessionStorage}getItem(e){try{return JSON.parse(this.storage.getItem(`${s}/${e}`))}catch{return null}}setItem(e,t){try{this.storage.setItem(`${s}/${e}`,JSON.stringify(t))}catch{}}};var l={};l=new URL("logo-light.50757842.png",import.meta.url).toString();var a={};a=new URL("logo-dark.33c21a11.png",import.meta.url).toString();const c=`
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
    gap: 1rem;
  }
`,u=`
  <style>${c}</style>

  <form>
    <picture>
      <source srcset="${/*@__PURE__*/e(l)}" media="(prefers-color-scheme: dark)">
      <source srcset="${/*@__PURE__*/e(a)}" media="(prefers-color-scheme: light)">
      <img src="${/*@__PURE__*/e(a)}" alt="Quiz" width="120" height="120" aria-hidden="true">
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
`,d=document.createElement("template");d.innerHTML=u;class h extends HTMLElement{#e=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(d.content.cloneNode(!0))}connectedCallback(){this.#e=this.shadowRoot.querySelector("form"),this.#e.addEventListener("submit",this.#t),this.#e.addEventListener("change",this.#i);let e=n.getItem("options");e&&(this.#e.sequential.checked=e.sequential,this.#e["multiple-choice"].checked=e.multipleChoice)}disconnectedCallback(){this.#e.removeEventListener("submit",this.#t),this.#e.removeEventListener("change",this.#i)}#i=()=>{let e=this.#e.sequential.checked,t=this.#e["multiple-choice"].checked;n.setItem("options",{sequential:e,multipleChoice:t})};#t=e=>{e.preventDefault(),this.dispatchEvent(new CustomEvent("quiz-start",{bubbles:!0,composed:!0,detail:{sequential:e.target.sequential.checked,multipleChoice:e.target["multiple-choice"].checked}}))};static defineCustomElement(e="quiz-intro"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,h)}}var m={};m=new URL("celebration.228925ff.png",import.meta.url).toString();const p=`
  :host {
    display: grid;
    grid-template-areas: "header" "content" "footer";
    grid-template-rows: auto 1fr auto;
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

  footer {
    grid-area: footer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 1rem;
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
    font-weight: bold;
    border-block-end: 2px solid var(--body-color);
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
    border-color: color-mix(in srgb, var(--success-color) 40%, #ffffff);
    color: var(--body-bg-color);
  }

  .multiple-choice > button.incorrect {
    background-color: var(--error-color);
    border-color: color-mix(in srgb, var(--error-color) 40%, #ffffff);
    color: var(--body-bg-color);
  }

  .quit-quiz-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--error-color);
    color: var(--body-bg-color);
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
    font-size: calc(1.425rem + 1vw);
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
`,f=`
  <style>${p}</style>

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
`,b=document.createElement("template");b.innerHTML=f;class g extends HTMLElement{#o=[];#r=0;#s=0;#n=0;#l=-1;#a=new Set;#c=new Set;#u=null;#d=null;#h=null;#m=null;#p=null;#f=null;#b=null;#g=null;#w=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"}).appendChild(b.content.cloneNode(!0))}get sequential(){return this.hasAttribute("sequential")}set sequential(e){this.toggleAttribute("sequential",!!e)}get multipleChoice(){return this.hasAttribute("multiple-choice")}set multipleChoice(e){this.toggleAttribute("multiple-choice",!!e)}connectedCallback(){this.#v("sequential"),this.#v("multipleChoice"),this.#d=this.shadowRoot.getElementById("answerForm"),this.#h=this.shadowRoot.getElementById("question"),this.#m=this.shadowRoot.getElementById("answerInput"),this.#p=this.shadowRoot.getElementById("feedback"),this.#f=this.shadowRoot.getElementById("score"),this.#b=this.shadowRoot.getElementById("progress"),this.#g=this.shadowRoot.getElementById("multipleChoice"),this.#w=this.shadowRoot.getElementById("quitQuiz"),this.#d.addEventListener("submit",this.#t),this.#g.addEventListener("click",this.#y),this.#w.addEventListener("click",this.#E),this.#C(),this.multipleChoice?(this.#m.setAttribute("disabled",""),this.#m.setAttribute("type","text")):this.#m.focus()}disconnectedCallback(){this.#d.removeEventListener("submit",this.#t),this.#g.removeEventListener("click",this.#y),this.#w.addEventListener("click",this.#E),null!==this.#u&&(clearTimeout(this.#u),this.#u=null)}#C(){this.#o=this.#x(),this.#s=this.#o.length,this.#q()}#t=e=>{e.preventDefault(),null===this.#u&&this.#k()};#y=e=>{let t=e.target.closest("button");null===this.#u&&t&&(this.#m.value=t.textContent,this.#k())};#z=()=>{this.dispatchEvent(new Event("quiz-restart",{bubbles:!0,composed:!0}))};#E=()=>{if(1===this.#n&&null===this.#u)return this.#z();confirm("Quit the quiz? Your progress will be lost.")&&this.#z()};#x(){let e=[];for(let t=1;t<=10;t+=1)for(let i=1;i<=10;i+=1){let o=t*i;e.push({factor1:t,factor2:i,product:o})}return this.multipleChoice&&e.forEach(t=>{for(t.answerChoices=[t.product];t.answerChoices.length<3;){let i=e[Math.floor(Math.random()*e.length)].product;t.answerChoices.includes(i)||t.answerChoices.push(i)}t.answerChoices=function(e){if(!Array.isArray(e))throw TypeError("Expected an array for first argument");let t=[...e],i=t.length;for(;i;){let e=Math.random()*i--|0,o=t[i];t[i]=t[e],t[e]=o}return t}(t.answerChoices)}),e}#q(){this.sequential?this.#Q():this.#S(),this.#A(),this.#I()}#Q(){this.#l+=1;let e=this.#o[this.#l];if(this.#l<this.#s){let{factor1:t,factor2:i}=e;this.#h.textContent=`${t} x ${i} =`,this.multipleChoice&&this.#L(e.answerChoices)}else this.#$()}#S(){let e;if(this.#a.size===this.#s){this.#$();return}do this.#l=Math.floor(Math.random()*this.#s),e=this.#o[this.#l];while(this.#a.has(`${e.factor1}-${e.factor2}`))this.#a.add(`${e.factor1}-${e.factor2}`),this.#h.textContent=`${e.factor1} x ${e.factor2} =`,this.multipleChoice&&this.#L(e.answerChoices)}#L(e){this.#g.replaceChildren(),e.forEach(e=>{let t=document.createElement("button");t.setAttribute("data-answer",e),t.type="button",t.textContent=e,this.#g.appendChild(t)})}#k(){let e=parseInt(this.#m.value,10),t=this.#o[this.#l],i=t.product,o=1e3;if(this.multipleChoice){if(this.#g.setAttribute("inert",""),e===i)this.#g.querySelector(`button[data-answer="${i}"]`).classList.add("correct"),this.#m.classList.add("correct"),this.#r+=1;else{let r=this.#g.querySelector(`button[data-answer="${i}"]`),s=this.#g.querySelector(`button[data-answer="${e}"]`);r.classList.add("correct"),s.classList.add("incorrect"),this.#m.classList.add("incorrect"),o=2e3,this.#c.add({question:`${t.factor1} x ${t.factor2}`,userAnswer:e,correctAnswer:i})}}else this.#m.style.pointerEvents="none",e===i?(this.#p.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--success-color)" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg> Correct!
        `,this.#r+=1):(this.#p.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" fill="var(--error-color)" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
          </svg> Incorrect! The answer is ${i}.
        `,o=2e3,this.#c.add({question:`${t.factor1} x ${t.factor2}`,userAnswer:e,correctAnswer:i}));this.#A(),this.#u=setTimeout(()=>{this.#m.value="",this.#m.focus(),this.#q(),this.#u=null,this.multipleChoice?(this.#g.removeAttribute("inert"),this.#m.classList.remove("correct","incorrect"),this.#g.querySelectorAll("button").forEach(e=>{e.classList.remove("correct","incorrect")})):(this.#m.style.pointerEvents="auto",this.#p.replaceChildren())},o)}#A(){let e=(this.#r/this.#n*100||0).toFixed(0);this.#f.textContent=`Score: ${this.#r} / ${this.#n} (${e}%)`}#I(){this.#n+=1,this.#b.value=this.#n/this.#s}#$(){this.shadowRoot.getElementById("quiz").innerHTML=`
      <div class="completion-message">
        <img src="${/*@__PURE__*/e(m)}" alt="Celebration" width="125" height="121" aria-hidden="true">
        Congratulations! You've completed all questions.
        <br>
        Your final score is ${this.#r} / ${this.#s}.

        ${this.#c.size>0?`
              <details>
                <summary>View incorrect answers</summary>

                <table>
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Your Answer</th>
                      <th>Correct Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${[...this.#c].map(({question:e,userAnswer:t,correctAnswer:i})=>`
                          <tr>
                            <td>${e}</td>
                            <td>${t}</td>
                            <td>${i}</td>
                          </tr>
                        `).join("")}
                  </tbody>
                </table>
              </details>
            `:""}

        <button id="restartQuiz">Start Over</button>
      </div>
    `,this.shadowRoot.querySelector("header").setAttribute("hidden",""),this.shadowRoot.querySelector("footer").setAttribute("hidden",""),this.#A();let t=this.shadowRoot.getElementById("restartQuiz");t?.addEventListener("click",this.#z,{once:!0})}#v(e){if(Object.prototype.hasOwnProperty.call(this,e)){let t=this[e];delete this[e],this[e]=t}}static defineCustomElement(e="multiply-quiz"){"undefined"==typeof window||window.customElements.get(e)||window.customElements.define(e,g)}}const w=document.querySelector("main");document.addEventListener("quiz-start",e=>{let t=document.querySelector("quiz-intro"),i=document.createElement("multiply-quiz"),o=e.detail.sequential,r=e.detail.multipleChoice;o&&i?.setAttribute("sequential",""),r&&i?.setAttribute("multiple-choice",""),w?.appendChild(i),t?.remove()}),document.addEventListener("quiz-restart",()=>{let e=document.querySelector("multiply-quiz"),t=document.createElement("quiz-intro");w?.appendChild(t),e?.remove()}),window.visualViewport.addEventListener("resize",()=>{document.documentElement.style.height=`${window.visualViewport.height}px`}),h.defineCustomElement(),g.defineCustomElement();
//# sourceMappingURL=index.e963ed1b.js.map
