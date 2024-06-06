const template = document.createElement("template");
template.innerHTML = `
  <style>
    .poetry-card-wrapper {
        background-color: var(--bg-card, #fff);
        color: var(--text-card, #000);
        border-radius: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        width: var(--card-width, 350px);
        height: var(--card-height, 300px);

    }
    .poetry-card-slot-wrapper {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
      gap: 10px;  
    }
    .poetry-card-header {
        align-self: center;
        height: clac(var(--card-height, 300px) * 0.1 - 10px);
        color: var(--card-header-text, #777);
    }
    .poetry-card-content {
      height: calc(var(--card-height, 300px) * 0.6 - 10px);
      letter-spacing: 1px;
      font-weight: 400;
      font-size: 1.1rem;
      color: var(--card-content-text, #000);
    }
    .poetry-card-footer {
        align-self: end;
        height: calc(var(--card-height, 300px) * 0.1 - 10px );
    }
    .poetry-card-footer button {
        background-color: var(--card-btn-bg, green);
        color: var(--card-btn-text, #FFF); 
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: none;
        width: 100%;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        outline: none;
    }
  </style>
  <div class="poetry-card-wrapper">
    <slot name="content">
      <div class="poetry-card-slot-wrapper">
        <div class="poetry-card-header">
          <h2>Card Title</h2>
        </div>
        <div class="poetry-card-content">
          <p>Card content</p>
        </div>
        <div class="poetry-card-footer">
          <button>label</button>
        </div>
      </div>
     </slot>
  </div>`;

class Card extends HTMLElement {

    #recoveryData
    constructor() {
        super();
        this.#recoveryData = {};
        this.root = this.attachShadow({ mode: "closed" });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
        this.root.querySelector('slot').addEventListener('click', this.#handleClick.bind(this));
      
    }   

    connectedCallback() {
        if(!this.hasAttribute('label')) {
          this.root.querySelector('button').style.display = 'none';
        }
    }

    disconnectedCallback() {
        console.log("Card element removed from page.");
    }

    adoptedCallback() {
        console.log("Card element moved to new page.");
    }
    
    attributeChangedCallback(name, oldValue, newValue) {   
        switch(name.toLowerCase()) {
          case 'customstyles':
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(newValue);
            this.root.adoptedStyleSheets = [sheet]; 
            break;  

          case 'title':
            this.root.querySelector('.poetry-card-header h2').textContent = newValue;
            break;  

          case 'content':
            this.root.querySelector('.poetry-card-content p').textContent = newValue;
            break;  

          case 'label':
            this.root.querySelector('button').textContent = newValue;
            break;  

          case 'recoverydata':
            this.setRecoveryData(newValue);
            break;
 
            default:
            break;
        }
    }

    static get observedAttributes() {
        return ['customstyles', 'title', 'content', 'label', 'recoverydata'];
    }

    get customstyles() {
      return this.getAttribute('customstyles');
    }
    set customstyles(value) {
      this.setAttribute('customstyles', value);
    }
  
    get title() {
      return this.getAttribute('title');
    }
    set title(value) {
      this.setAttribute('title', value);
    }
  
    get content() {
      return this.getAttribute('content');
    }
    set content(value) {
      this.setAttribute('content', value);
    }
  
    get label() {
      return this.getAttribute('label');
    }
    set label(value) {
      this.setAttribute('label', value);
    }

    get recoverydata() {
      return this.getAttribute('recoverydata');
    }
    set recoverydata(value) {
      this.setRecoveryData(value);
      this.setAttribute('recoverydata', value);

    }
/*
    getRecoveryData() {
      return this.#recoveryData;
    }
*/
    setRecoveryData(value) {
      if(typeof value === "string") {
         value = JSON.parse(value); 
      }
      if(!value || !(value instanceof Object)) {
        throw new Error("Recovery data must be an object");
      }
      this.#recoveryData = value;
    } 

    #handleClick(ev) {
      const element = ev.target;
      ev.stopPropagation(); 
      const ce = new CustomEvent('recovery', { detail: { data: this.#recoveryData, element } });
      this.dispatchEvent(ce);
      
    }
}

window.customElements.define("poetry-card", Card);

