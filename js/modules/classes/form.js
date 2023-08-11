// --{Imports}-- //
// Utility //
import EventHandler from '../utility/event-handler.js'


class Form {
    constructor(formElement) {
        if (!formElement) {
            return
        };

        this.currentForm = formElement;

        this.formInterpreter = new FormInterpreter;
        this.eventHandler = new EventHandler(this.currentForm);

        this.eventHandler.new('submitted');

        this._setupForm();
    };

    _setupForm() {
        if (!this.currentForm) {
            return
        };

        let onSubmit = (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            this._submitForm();
        };

        this.eventHandler.connect('submit', onSubmit);
    };

    _submitForm() {
        if (this.formInterpreter.isFormValid(this.currentForm)) {
            this.eventHandler.fire('submitted');
        };
    };

    remove() {
        this.eventHandler.remove();
        delete this.eventHandler;

        this.formInterpreter.remove();
        delete this.formInterpreter;

        this.currentForm = undefined;
    };
}

class FormInterpreter extends Form {
    isFormValid(formElement) {
        return true;
    };

    remove() {

    };
}


export default Form