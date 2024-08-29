// import { createCard } from "./card";

// const profileInfo = document.querySelector('.profile__info');
// const pageSection = document.querySelector('.page__section');
// const profileImage = document.querySelector('.profile__image');
// const placesList = document.querySelector('.places__list');
// const newImageForm = document.forms['new-place'];
// const newCardNameInput = newImageForm.querySelector('.popup__input_type_card-name');
// const newCardUrlInput = newImageForm.querySelector('.popup__input_type_url');
// const editProfileForm = document.forms['edit-profile'];
// const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
// const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');

export const getProfile = function () {
    return fetch('https://nomoreparties.co/v1/wff-cohort-22/users/me', {
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435'
        }
    });
}

export const saveProfile = function (userName, userDescription) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-22/users/me ', {
        method: 'PATCH',
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName.value,
            about: userDescription.value
        })
    });
}

export const getCards = function () {
    return fetch('https://nomoreparties.co/v1/wff-cohort-22/cards', {
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435'
        }
    });
}

export const saveCard = function (name, link) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-22/cards', {
        method: 'POST',
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    });
}

export const deleteCard = function (cardId) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-22/cards/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435',
            'Content-Type': 'application/json'
        }
    })
}

export const setLike = function (cardId) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-22/cards/likes/' + cardId, {
        method: 'PUT',
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435',
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     name: userName.value,
        //     about: userDescription.value
        // })
    })
}

export const desLike = function (cardId) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-22/cards/likes/' + cardId, {
        method: 'DELETE',
        headers: {
            authorization: '414f8694-193c-4196-bcbb-74dcac9ca435',
            'Content-Type': 'application/json'
        }
    });
}
