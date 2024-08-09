export { open };

function open(popupType) {
    if (popupType) {
        popupType.addEventListener('click', close);
        document.addEventListener('keydown', close);
        popupType.classList.add('popup_is-opened');
    }
}

function close(e) {
    if (e.target.className === 'popup__close' || e.target.classList.contains('popup') || e.key === 'Escape') {
        document.querySelectorAll('.popup').forEach(popup => {
            if (popup.classList.contains('popup_is-opened')) {
                popup.classList.remove('popup_is-opened');
                popup.removeEventListener('click', close);
                document.removeEventListener('keydown', close);
            }
        });
    }
}