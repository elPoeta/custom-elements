const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host > div h2{
      color: var(--emerald-400, #fff);
    }
  </style>
  <div>
    <h2>Sample</h2>
    <slot name="content">Default content</slot>
  </div>`;

class Sample extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "closed" });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }   

    connectedCallback() {
        console.log("Sample element added to page.");
    }

    disconnectedCallback() {
        console.log("Sample element removed from page.");
    }

    adoptedCallback() {
        console.log("Sample element moved to new page.");
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log("Sample element attributes changed.");
    }

    static get observedAttributes() {
        return [];
    }

}

window.customElements.define("poetry-sample", Sample);

