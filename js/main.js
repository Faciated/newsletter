// --{Modules}-- //
// Utility //
import print from "./modules/utility/print.js"

// Classes //
import form from "./modules/classes/form.js";

// --{Variables}-- //
const successWindow = document.querySelector('.success-msg')
const newsletterForm = document.querySelector('.newsletter-card__form')

const newsletterFormHandler = new form(newsletterForm)

if (newsletterFormHandler) {
    newsletterFormHandler.setupForm();
    newsletterFormHandler.connect("submitted", function (event) {
      event.target.setAttribute('style', 'visibility: hidden;')
    })
};
