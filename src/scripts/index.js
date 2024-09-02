import '../pages/index.css';
import {
    profile,
    profileTitle,
    profileDescription,
    profileAvatar,
    placesList,
    spinner,
    avatarPopup,
    profilePopup,
    newCardPopup,
    imagePopup,
    editProfileForm,
    newPlaceForm,
    avatarForm,
    profileNameInput,
    descriptionInput,
    validationConfig,
    addButton,
    editButton,
    avatarButton,
    cardNameInput,
    cardUrlInput,
    avatarUrlInput
} from './constants.js';
import { createCard, handleLikeButton, handleDeleteButton } from './card';
import { openPopup, closePopup } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getProfile, getCards, saveProfile, saveCard, saveAvatar } from './api';

const promises = [getProfile(), getCards()];

newPlaceForm.addEventListener('submit', handleNewCardSubmit);
editProfileForm.addEventListener('submit', handleProfileSubmit);
avatarForm.addEventListener('submit', handleAvatarSubmit);

addButton.addEventListener('click', handleAddButton);
editButton.addEventListener('click', handleEditButton);
avatarButton.addEventListener('click', handleAvatarButton);

renderLoading(true);

/*  Начальная загрузка данных профиля пользователя и списка карточек используя
    Promise.all() для гарантированного получения user_id до начала загрузки карточек
*/
Promise.all(promises)
    .then((data) => {
        profile.id = data[0]._id;
        profileAvatar.setAttribute('style', `background-image: url(${data[0].avatar})`);
        profileTitle.textContent = data[0].name;
        profileDescription.textContent = data[0].about;

        data[1].forEach(cardItem => {
            placesList.append(createCard(getNewCardObject(cardItem)));
        });
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        renderLoading(false);
    })

enableValidation(validationConfig);

function handleAddButton() {
    newPlaceForm.reset();
    clearValidation(newPlaceForm, validationConfig);
    openPopup(newCardPopup);
}

function handleEditButton() {
    profileNameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(editProfileForm, validationConfig);
    openPopup(profilePopup);
}

function handleAvatarButton() {
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
    openPopup(avatarPopup);
}

function handleCardClick(cardImageLink, cardName) {
    imagePopup.querySelector('.popup__image').src = cardImageLink;
    imagePopup.querySelector('.popup__image').alt = cardName;
    imagePopup.querySelector('.popup__caption').textContent = cardName;
    openPopup(imagePopup);
}

function handleProfileSubmit(event) {
    event.preventDefault();

    setButtonName(profilePopup, 'Сохранение...');

    saveProfile(profileNameInput, descriptionInput)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closePopup(profilePopup);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(profilePopup, 'Сохранить');
        });

    clearValidation(editProfileForm, validationConfig);
}


function handleNewCardSubmit(event) {
    event.preventDefault();

    const newCardName = getValidCardName(cardNameInput.value);
    const newCardUrl = cardUrlInput.value;

    setButtonName(newCardPopup, 'Сохранение...');

    saveCard(newCardName, newCardUrl)
        .then((data) => {
            placesList.prepend(createCard(getNewCardObject(data)));
            closePopup(newCardPopup);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(newCardPopup, 'Сохранить');
        });

    newPlaceForm.reset();
    clearValidation(newPlaceForm, validationConfig);
}

function handleAvatarSubmit(event) {
    event.preventDefault();

    const avatarLink = avatarUrlInput.value;

    setButtonName(avatarPopup, 'Сохранение...');

    saveAvatar(avatarLink)
        .then((data) => {
            profileAvatar.setAttribute('style', `background-image: url(${data.avatar})`);
            closePopup(avatarPopup);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(avatarPopup, 'Сохранить');
        });
}

function getValidCardName(inputString) {
    if (inputString.length > 1)
        return inputString[0].toUpperCase() + inputString.slice(1).toLowerCase();

    return inputString.toUpperCase();
}

function getNewCardObject(cardItem) {
    const userId = profile.id;
    const handlers = { handleLikeButton, handleDeleteButton, handleCardClick };

    return { cardItem, handlers, userId };
}

function setButtonName(popup, name) {
    popup.querySelector('.popup__button').textContent = name;
}

function renderLoading(isLoading) {
    if (isLoading) {
        spinner.classList.add('spinner_visible');
    } else {
        spinner.classList.remove('spinner_visible');
    }
}