// --{Imports}-- //
// Utility //
import EventHandler from '../utility/event-handler.js'

class FormInterpreter { // was too lazy to add different input types
    isFormValid(form) {
        for (const [name, data] of Object.entries(form.getFormValues())) {
            if (!this[data.type + "Check"](data.value))
                return;
        };

        return true;
    };

    emailCheck(emailAddress) {
        let formattedEmailAddress = String(emailAddress).toLowerCase()

        let expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return (formattedEmailAddress && formattedEmailAddress.length > 0 && expression.test(formattedEmailAddress));
    };
}

class Form {
    constructor(formElement) {
        if (!formElement)
            return;

        this.currentForm = formElement;

        this.formInterpreter = new FormInterpreter;
        this.eventHandler = new EventHandler(this.currentForm);

        this.eventHandler.new('submitted');

        this._setupForm();
    };

    _setupForm() {
        if (!this.currentForm)
            return;
   

        let handler = (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            this._submitForm();
        };

        this.eventHandler.connect('submit', handler);
    };

    _submitForm() {
        if (this.formInterpreter.isFormValid(this)) {
            this.eventHandler.fire('submitted', this.getFormValues());
        };
    };

    getFormValues() {
        let formValues = {};

        for (const childElement of this.currentForm.children) {
            if (childElement.tagName !== 'INPUT')
                continue;

            formValues[childElement.name] = {
                value: childElement.value,
                type: childElement.dataset.type
            };
        };

        return formValues;
    };

    resetFormInputs() {
        for (const childElement of this.currentForm.children) {
            if (childElement.tagName !== 'INPUT')
                continue;

            childElement.value = ""
        };
    };

    updateFormInput(inputName, newValue) {
        let formInput;

        for (const childElement of this.currentForm.children) {
            if (childElement.tagName === 'INPUT' && childElement.name === inputName) {
                formInput = childElement;
                break;
            };
        };

        if (!formInput)
            return;

        formInput.value = newValue;
    };

    remove() {
        this.eventHandler.remove();
        delete this.eventHandler;

        delete this.formInterpreter;

        this.currentForm = undefined;
    };
}

export default Form