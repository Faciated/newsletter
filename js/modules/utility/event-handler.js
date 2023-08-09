export default class EventHandler {
    constructor(element) {
        this.element = element;
        this.events = [];
    };

    connect(eventName, callback, options) {
        this.events.push({ 'eventName': eventName, 'callback': callback, 'options': options });
        this.element.addEventListener(eventName, callback, options);
    };

    remove() {
        for (const event of this.events) {
            this.element.removeEventListener(event.eventName, event.callback, event.options);
        }

        this.events = null;
        this.element = null;
    };
}