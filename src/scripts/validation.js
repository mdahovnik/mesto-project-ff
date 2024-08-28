export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        setInputEventListeners(form, config)
    })
}

export function clearValidation(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

    inputList.forEach((input) => {
        input.classList.remove(config.inputErrorClass);
        const inputError = form.querySelector(`.${input.id}-error`);
        
        inputError.classList.remove(config.errorClass);
        inputError.textContent = '';
    })
}

function checkInputValidation(form, input) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }

    if (!input.validity.valid) {
        showError(form, input, input.validationMessage);
    }
    else {
        hideError(form, input);
    }
}

function showError(form, input, errorMessage, config) {
    const inputError = form.querySelector(`.${input.id}-error`);
    input.classList.add('popup__input_type_error');
    inputError.textContent = errorMessage;
    inputError.classList.add('popup__error_visible');
}

function hideError(form, input, config) {
    const inputError = form.querySelector(`.${input.id}-error`);
    input.classList.remove('popup__input_type_error');
    inputError.classList.remove('popup__error_visible');
    inputError.textContent = '';
}

function setInputEventListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, submitButton);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidation(form, input);
            toggleButtonState(inputList, submitButton);
        })
    })
}

function toggleButtonState(inputList, button) {
    if (hasInvalidInput(inputList)) {
        button.classList.add('popup__button_disabled');
    } else {
        button.classList.remove('popup__button_disabled');
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
}