import "../components/Sample.js";
import "../components/Card.js";
import "../components/Table.js";

const init = () => {
    const root = document.getElementById("root");
    /*
    const sheet = `.poetry-card-wrapper { 
      color: red; 
      background-color: cornflowerblue;
      padding: 1rem;
      font-size: 2rem;
      margin-block: 1rem;
    }`;
    //console.log(sheet)
    //document.querySelector('poetry-card').setAttribute('customstyles', sheet);
    const card = document.createElement('poetry-card');
    card.setRecoveryData({ test: 'this is a test'});
    root.append(card);
    document.querySelector('poetry-card')
     .addEventListener('recovery', (e) => {
        const { element } = e.detail
        if(element.tagName.toLowerCase() === 'h2') {
         console.log(e.detail);
        }
     });*/

     const table = document.createElement('poetry-table');
     table.setAttribute('headers', 'id,title,visitas,fecha,duracion,descripcion,precio,imagen,acciones');
     table.data = [
       [1, 'test', 1, '2020-01-01', 1, 'test', 1, 'https://placeimg.com/640/480/any', ''],  
       [2, 'test', 1, '2020-01-01', 1, 'test', 1, 'https://placeimg.com/640/480/any', ''],
       [3, 'test', 1, '2020-01-01', 1, 'test', 1, 'https://placeimg.com/640/480/any', ''],
       [4, 'test', 1, '2020-01-01', 1, 'test', 1, 'https://placeimg.com/640/480/any', ''],
      ]

     root.append(table);
}

window.addEventListener("load", init);