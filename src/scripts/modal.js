export { showPopup };

function showPopup(popupType) {
    if (popupType) {
        popupType.addEventListener('click', hidePopup);
        document.addEventListener('keydown', hidePopup);
        popupType.classList.add('popup_is-opened');
    }
}

function hidePopup(e) {
    if (isCloseClicked(e) || isOverlayClicked(e) || isEscapePressed(e)) {
        document.querySelectorAll('.popup').forEach(popup => {
            if (popup.classList.contains('popup_is-opened')) {
                popup.classList.remove('popup_is-opened');
                popup.removeEventListener('click', hidePopup);
                document.removeEventListener('keydown', hidePopup);
            }
        });
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