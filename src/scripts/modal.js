export { openPopup, closePopup };

function openPopup(popupType) {
    document.querySelector('.page').classList.add('page-no-scroll');

    popupType.addEventListener('click', handleOnClick);
    document.addEventListener('keydown', handleOnKeydown);
    popupType.classList.add('popup_is-opened');
}

function closePopup(popupType) {
    document.querySelector('.page').classList.remove('page-no-scroll');
    if (popupType && popupType.classList.contains('popup_is-opened')) {
        popupType.removeEventListener('click', handleOnClick);
        document.removeEventListener('keydown', handleOnKeydown);
        popupType.classList.remove('popup_is-opened');
    }
}

function handleOnClick(event) {
    if (isCloseClick(event) || isOverlayClick(event)) {
        closePopup(event.currentTarget);
    }
}

function handleOnKeydown(event) {
    if (isEscapePressed(event)) {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

function isCloseClick(event) {
    return event.target.className === 'popup__close'
}

function isOverlayClick(event) {
    return event.target.classList.contains('popup');
}

function isEscapePressed(event) {
    return event.key === 'Escape';
}
