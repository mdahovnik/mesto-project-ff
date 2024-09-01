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

function setInputEventListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, submitButton, config);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidation(form, input, config);
            toggleButtonState(inputList, submitButton, config);
        })
    })
}

function checkInputValidation(form, input, config) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }

    if (!input.validity.valid) {
        showError(form, input, input.validationMessage, config);
    }
    else {
        hideError(form, input, config);
    }
}

function showError(form, input, errorMessage, config) {
    const inputError = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(config.errorClass);
}

function hideError(form, input, config) {
    const inputError = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    inputError.classList.remove(config.errorClass);
    inputError.textContent = '';
}

function toggleButtonState(inputList, button, config) {
    if (hasInvalidInput(inputList)) {
        button.classList.add(config.inactiveButtonClass);
    } else {
        button.classList.remove(config.inactiveButtonClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
}