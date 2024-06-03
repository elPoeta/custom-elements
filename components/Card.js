const template = document.createElement("template");
template.innerHTML = `
  <style>
  </style>
  <div>

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
        console.log("Card element attributes changed.");
    }

    static get observedAttributes() {
        return [];
    }

}

window.customElements.define("poetry-card", Card);

