import './formdata-event-polyfill';
export class FormSubmitController {
    constructor(host, options) {
        (this.host = host).addController(this);
        this.options = Object.assign({ form: (input) => input.closest('form'), name: (input) => input.name, value: (input) => input.value, disabled: (input) => input.disabled, reportValidity: (input) => {
                return typeof input.reportValidity === 'function' ? input.reportValidity() : true;
            } }, options);
        this.handleFormData = this.handleFormData.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    hostConnected() {
        document.addEventListener('formdata', this.handleFormData, { capture: true });
        document.addEventListener('submit', this.handleFormSubmit, { capture: true });
    }
    hostDisconnected() {
        document.removeEventListener('formdata', this.handleFormData, { capture: true });
        document.removeEventListener('submit', this.handleFormSubmit, { capture: true });
    }
    handleFormData(event) {
        const disabled = this.options.disabled(this.host);
        const name = this.options.name(this.host);
        const value = this.options.value(this.host);
        if (!disabled && typeof name === 'string' && typeof value !== 'undefined') {
            if (Array.isArray(value)) {
                value.forEach(val => {
                    event.formData.append(name, val.toString());
                });
            }
            else {
                event.formData.append(name, value.toString());
            }
        }
    }
    handleFormSubmit(event) {
        const form = this.options.form(this.host);
        const disabled = this.options.disabled(this.host);
        const reportValidity = this.options.reportValidity;
        if (event.target === form && !disabled && !(form === null || form === void 0 ? void 0 : form.noValidate) && !reportValidity(this.host)) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }
    submit(submitter) {
        const form = this.options.form(this.host);
        if (form) {
            const button = document.createElement('button');
            button.type = 'submit';
            button.style.position = 'absolute';
            button.style.width = '0';
            button.style.height = '0';
            button.style.clipPath = 'inset(50%)';
            button.style.overflow = 'hidden';
            button.style.whiteSpace = 'nowrap';
            if (submitter) {
                ['formaction', 'formmethod', 'formnovalidate', 'formtarget'].forEach(attr => {
                    if (submitter.hasAttribute(attr)) {
                        button.setAttribute(attr, submitter.getAttribute(attr));
                    }
                });
            }
            form.append(button);
            button.click();
            button.remove();
        }
    }
}
