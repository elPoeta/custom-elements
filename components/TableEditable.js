const template = document.createElement("template");
template.innerHTML = `
  <style>
    table{border:1px solid #ccc;border-collapse:collapse;margin:0;padding:0;width:100%;table-layout:fixed;color:var(--text-table, #000)}
    table caption{font-size:1.5em;margin:.5em 0 .75em}
    table tr{background-color:#f8f8f8;border:1px solid #ddd;padding:.35em}
    table td,table th{padding:.625em;text-align:center}table th{font-size:.85em;letter-spacing:.1em;text-transform:uppercase}
    @media screen and (max-width:600px){
      table{border:0}table caption{font-size:1.3em}
      table thead{border:none;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}
      table tr{border-bottom:3px solid #ddd;display:block;margin-bottom:.625em}
      table td{border-bottom:1px solid #ddd;display:block;font-size:.8em;text-align:right}
      table td::before{content:attr(data-label);float:left;font-weight:700;text-transform:uppercase}
      table td:last-child{border-bottom:0}
  }
  </style>
  <div>
    <table>
      <thead>
       <tr>
         <th data-label="Col 1">Col 1</th>
         <th data-label="Col 2">Col 2</th>
         <th data-label="Col 3">Col 3</th>
        </tr>       
      </thead>
      <tbody>
      </tbody>       
    </table>
  </div>`;

class TableEditable extends HTMLElement {

    #headers
    constructor() {
        super();
        this.#headers = [];
        this.root = this.attachShadow({ mode: "closed" });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }   

    connectedCallback() {
        console.log("table element added to page.");
    }

    disconnectedCallback() {
        console.log("table element removed from page.");
    }

    adoptedCallback() {
        console.log("table element moved to new page.");
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name.toLowerCase()) {
          case 'headers':
            this.#headers = JSON.parse(newValue);
            this.root.querySelector('thead tr').innerHTML = this.#headers.map((header) => `<th data-label="${header.label}">${header.label}</th>`).join('');
            break;  
 
          default:
            break;
        }
    }

    static get observedAttributes() {
        return ['headers'];
    }

    get headers() {
        return this.getAttribute('headers');
    }

    set headers(value) {
        this.setAttribute('headers', value);
    }

    set data(data) {
      const tableBody = this.root.querySelector('tbody');
      const rows = data.map((rowData) => {
        const row = document.createElement('tr');
        const cells = rowData.map((cellData,index) => {
          const cell = document.createElement('td');
          cell.dataset.label = this.#headers[index].label;
          cell.innerHTML = this.#headers[index].input === 'custom' ? cellData : `<input type="${this.#headers[index].input}" value="${cellData}" />`;
          return cell;
        });
        row.append(...cells);
        return row;
      });
      tableBody.append(...rows);
    }
}

window.customElements.define("poetry-table-editable", TableEditable);

