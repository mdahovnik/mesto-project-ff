import { Config } from "./constants";


export class Validation {

    private static _validation: Validation = null;

    static get getValidation(): Validation {
        if (!this._validation) {
            this._validation = new Validation();
            return this._validation;
        }
        return this._validation;
    }

    private constructor() { }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(Config.validationConfig.formSelector));
        formList.forEach((form: HTMLFormElement) => {
            this.setInputEventListeners(form)
        })
    }


    clearValidation(form: HTMLFormElement) {
        const inputList = Array.from(form.querySelectorAll(Config.validationConfig.inputSelector));
        const submitButton = form.querySelector(Config.validationConfig.submitButtonSelector) as HTMLButtonElement;

        this.toggleButtonState(inputList, submitButton);

        inputList.forEach((input: HTMLInputElement) => {
            input.classList.remove(Config.validationConfig.inputErrorClass);
            const inputError = form.querySelector(`.${input.id}-error`);

            inputError.classList.remove(Config.validationConfig.errorClass);
            inputError.textContent = '';
        })
    }


    private setInputEventListeners(form: HTMLFormElement) {
        const inputList = Array.from(form.querySelectorAll(Config.validationConfig.inputSelector));
        const submitButton = form.querySelector(Config.validationConfig.submitButtonSelector) as HTMLButtonElement;

        this.toggleButtonState(inputList, submitButton);

        inputList.forEach((input: HTMLInputElement) => {
            input.addEventListener('input', () => {
                this.checkInputValidation(form, input);
                this.toggleButtonState(inputList, submitButton);
            })
        })
    }


    private checkInputValidation(form: HTMLFormElement, input: HTMLInputElement) {
        if (input.validity.patternMismatch) {
            input.setCustomValidity(input.dataset.errorMessage);
        }
        else input.setCustomValidity("");

        if (!input.validity.valid) {
            this.showError(form, input, input.validationMessage);
        }
        else this.hideError(form, input);
    }


    private showError(form: HTMLFormElement, input: HTMLInputElement, errorMessage: string) {
        const inputError = form.querySelector(`.${input.id}-error`);
        input.classList.add(Config.validationConfig.inputErrorClass);
        inputError.textContent = errorMessage;
        inputError.classList.add(Config.validationConfig.errorClass);
    }


    private hideError(form: HTMLFormElement, input: HTMLInputElement) {
        const inputError = form.querySelector(`.${input.id}-error`);
        input.classList.remove(Config.validationConfig.inputErrorClass);
        inputError.classList.remove(Config.validationConfig.errorClass);
        inputError.textContent = '';
    }


    private toggleButtonState(inputList: Element[], button: HTMLButtonElement) {
        if (this.hasInvalidInput(inputList)) {
            button.disabled = true;
            button.classList.add(Config.validationConfig.inactiveButtonClass);
        } else {
            button.disabled = false;
            button.classList.remove(Config.validationConfig.inactiveButtonClass);
        }
    }


    private hasInvalidInput(inputList: Element[]): boolean {
        return inputList.some((input: HTMLInputElement) => {
            return !input.validity.valid;
        })
    }
}