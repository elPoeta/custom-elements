import "../components/Sample.js";
import "../components/Card.js";
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
    const card = document.createElement('poetry-card');
    card.setRecoveryData({ test: 'this is a test'});
    root.append(card);
    document.querySelector('poetry-card')
     .addEventListener('recovery', (e) => {
        const { element } = e.detail
        if(element.tagName.toLowerCase() === 'h2') {
         console.log(e.detail);
        }
     })

}

window.addEventListener("load", init);