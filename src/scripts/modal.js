export { openPopup };

const popups = document.querySelectorAll('.popup');

function openPopup(popupType) {
    if (popupType) {
        popupType.addEventListener('click', handlerOnClick);
        document.addEventListener('keydown', handlerOnKeydown);
        popupType.classList.add('popup_is-opened');
    }
}

function closePopup(popupType) {
    if (popupType.classList.contains('popup_is-opened')) {
        popupType.removeEventListener('click', handlerOnClick);
        document.removeEventListener('keydown', handlerOnKeydown);
        popupType.classList.remove('popup_is-opened');
    }
}

function handlerOnClick(e) {
    if (isCloseClicked(e) || isOverlayClicked(e)) {
        popups.forEach(popup => { closePopup(popup); });
    }
}

function handlerOnKeydown(e) {
    if (isEscapePressed(e)) {
        popups.forEach(popup => { closePopup(popup); });
    }
}

function isCloseClicked(e) {
    return e.target.className === 'popup__close'
}

function isOverlayClicked(e) {
    return e.target.classList.contains('popup');
}

function isEscapePressed(e) {
    return e.key === 'Escape';
}
