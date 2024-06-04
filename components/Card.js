const template = document.createElement("template");
template.innerHTML = `
  <style>
    .poetry-card-wrapper {
        background-color: var(--bg-card, #fff);
        color: var(--text-card, #000);
        border-radius: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;

    }
  </style>
  <div class="poetry-card-wrapper">
    <div class="poetry-card-header">
      <slot name="header"></slot>
    </div>
    <div class="poetry-card-body">
      <slot name="body"></slot>
    </div>
    <div class="poetry-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>`;

class Card extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "closed" });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }   

    connectedCallback() {
        console.log("Card element added to page.");
    }

    disconnectedCallback() {
        console.log("Card element removed from page.");
    }

    adoptedCallback() {
        console.log("Card element moved to new page.");
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log("Card element attributes changed.", name);
        if(name.toLowerCase() === 'customstyles') {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(newValue);
          this.root.adoptedStyleSheets = [sheet]; 
        }
    }

    static get observedAttributes() {
        return ['customstyles'];
    }

    get customstyles() {
      return this.getAttribute('customstyles');
    }
    set customstyles(value) {
      this.setAttribute('customstyles', value);
    }
  
}

window.customElements.define("poetry-card", Card);

