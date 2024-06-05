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
}

window.addEventListener("load", init);