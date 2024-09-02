import { page } from './constants';

export { openPopup, closePopup };

function openPopup(popupType) {
    document.addEventListener('keydown', handleOnKeydown);
    popupType.addEventListener('click', handleOnClick);
    popupType.classList.add('popup_is-opened');
    page.classList.add('page-no-scroll');
}

function closePopup(popupType) {
    document.removeEventListener('keydown', handleOnKeydown);
    popupType.removeEventListener('click', handleOnClick);
    popupType.classList.remove('popup_is-opened');
    page.classList.remove('page-no-scroll');
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
