import "../components/Sample.js";
import "../components/Card.js";
import "../components/TableEditable.js";

const init = () => {
    const root = document.getElementById("root");
    
    const sheet = `.poetry-card-wrapper { 
      color: red; 
      background-color: cornflowerblue;
      padding: 1rem;
      font-size: 2rem;
      margin-block: 1rem;
    }`;
    //console.log(sheet)
    //document.querySelector('poetry-card').setAttribute('customstyles', sheet);
   // const card = document.createElement('poetry-card');
    //card.setAttribute('customstyles', sheet);
    /*
    card.setRecoveryData({ test: 'this is a test'});
    root.append(card);
    document.querySelector('poetry-card')
     .addEventListener('recovery', (e) => {
        const { element } = e.detail
        if(element.tagName.toLowerCase() === 'h2') {
         console.log(e.detail);
        }
     });

     root.append(document.createElement('br'));
*/

     const table = document.createElement('poetry-table-editable');
     const headers = [{ label: 'id', input: 'number' }, { label: 'title', input: 'text'}, {label: 'duracion', input: 'text'}, {label: 'fecha', input: 'date'}, {label: 'visitas', input: 'text'}, {label: 'descripcion', input: 'text'}, {label: 'precio', input: 'number'}, {label: 'imagen', input: 'text'}, {label: 'acciones', input: 'custom'}];
     table.setAttribute('headers', JSON.stringify(headers));
     table.data = [
       [1, 'test', 1, '2020-01-01', 1, 'test', 1, 'https://placeimg.com/640/480/any', ''],  
       [2, 'test', 1, '2020-01-01', 1, 'test', 1, 'https://placeimg.com/640/480/any', ''],
       [3, 'test', 1, '2020-01-01', 1, 'test', 1, 'https://placeimg.com/640/480/any', ''],
       [4, 'test', 1, '2020-01-01', 1, 'test', 1, 'https://placeimg.com/640/480/any', ''],
      ]

     root.append(table);
}

window.addEventListener("load", init);