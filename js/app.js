// --{Imports}-- //
// Classes //
import Form from "./modules/classes/form.js";
import PageSequencer from "./modules/classes/page-sequencer.js";

// --{Variables}-- //
const pages = new PageSequencer(document.querySelector('.pages-container'));
const newsletter = document.querySelector('.newsletter');
const newsletterForm = document.querySelector('.newsletter__form');
const newsletterFormButton = document.querySelector('button');
const successMessage = document.querySelector('.success-msg');
const successMessageEmail = document.querySelector('.email-markup');
const successMessageButton = successMessage.querySelector('button');
const formHandler = new Form(newsletterForm);

let submitHandler = (event) => {
    formHandler.resetFormInputs();
    successMessageEmail.innerText = event.arguments.email.value;
    pages.next();
};

formHandler.eventHandler.connect('submitted', submitHandler);

successMessageButton.addEventListener('click', (event) => {
    pages.prev();
})
