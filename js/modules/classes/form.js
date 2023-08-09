// --{Imports}-- //
// Utility //
import EventHandler from '../utility/event-handler.js'

class FormInterpreter {
    isFormValid(formElement) {
        return true;
    };

    remove() {

    };
}

class Form {
    constructor(formElement) {
        if (!formElement) {
            return
        };
        
        this.currentForm = formElement;

        this.formInterpreter = new FormInterpreter;
        this.eventHandler = new EventHandler(this.currentForm);

        this.submitted = new Event("submitted");
    };

    connect(eventName, callback, options) {
        this.eventHandler.connect(eventName, callback, options);
    };

    setupForm() {
        var thisObject = this;

        if (!thisObject.currentForm) {
            return
        };

        thisObject.eventHandler.connect('submit', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            thisObject._submitForm();
        });
    };

    
    _submitForm() {
        if (this.formInterpreter.isFormValid(this.currentForm)) {
            this.currentForm.dispatchEvent(this.submitted);
        };
    };

    remove() {
        this.formEvents.remove();
        this.formEvents = null;

        this.formInterpreter = null;

        this.currentForm = null;
    };
}

export default Form