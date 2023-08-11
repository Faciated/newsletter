// --{Modules}-- //
// Classes //
import Form from "./modules/classes/Form.js";

// --{Variables}-- //
const newsletter = document.querySelector('.newsletter-card')
const successWindow = document.querySelector('.success-window')

const formHandler = new Form(newsletter.querySelector('.newsletter-card__form'))

if (formHandler) {
    formHandler.eventHandler.connect("submitted", () => {
      
    })
};
