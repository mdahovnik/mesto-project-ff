import '../pages/index.css';
import { createCard, handleLike, handleDelete } from './card';
import { openPopup, closePopup } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getProfile, getCards, saveProfile, saveCard, saveAvatar } from './api';

document.addEventListener('click', handlePageButtons);

const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const spinner = document.querySelector('.places__spinner');
const promises = [getProfile(), getCards()];

const avatarPopup = document.querySelector('.popup_type_avatar');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfileForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];
const avatarForm = document.forms['avatar'];

const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const user = document.querySelector('.profile__info');
const userAvatar = document.querySelector('.profile__image');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);
renderLoading(true);

/*  Начальная загрузка данных профиля пользователя и списка карточек используя
Promise.all() для гарантированного получения user_id до начала загрузки карточек
*/
Promise.all(promises)
    .then((data) => {
        user.id = data[0]._id;
        userAvatar.setAttribute('style', `background-image: url(${data[0].avatar})`);
        user.querySelector('.profile__title').textContent = data[0].name;
        user.querySelector('.profile__description').textContent = data[0].about;

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


/*  Обработка нажатия кнопок редактирование профиля, добавления карточки, изменения аватара.
    В соответствии с кнопкой сгенерировавшей событие открываем нужный popup.*/
function handlePageButtons(event) {
    const element = event.target.classList;

    if (element.contains('profile__add-button')) {
        newPlaceForm.addEventListener('submit', handleNewCardSubmit);

        newPlaceForm.reset();
        clearValidation(newPlaceForm, validationConfig);
        openPopup(newCardPopup);
    }
    else
        if (element.contains('profile__edit-button')) {
            profileNameInput.value = content.querySelector('.profile__title').textContent;
            descriptionInput.value = content.querySelector('.profile__description').textContent;
            editProfileForm.addEventListener('submit', handleProfileSubmit);

            clearValidation(editProfileForm, validationConfig);
            openPopup(profilePopup);
        }
        else
            if (element.contains('profile__avatar-button')) {
                avatarForm.addEventListener('submit', handleAvatarSubmit);

                avatarForm.reset();
                clearValidation(avatarForm, validationConfig);
                openPopup(avatarPopup);
            }
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
            content.querySelector('.profile__title').textContent = data.name;
            content.querySelector('.profile__description').textContent = data.about;
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(profilePopup, 'Сохранить');
        });

    editProfileForm.removeEventListener('submit', handleProfileSubmit);

    clearValidation(editProfileForm, validationConfig);
    closePopup(profilePopup);
}


function handleNewCardSubmit(event) {
    event.preventDefault();
    const cardName = newCardPopup.querySelector('.popup__input_type_card-name').value;
    const newCardName = getValidCardName(cardName);
    const newCardUrl = newCardPopup.querySelector('.popup__input_type_url').value;

    setButtonName(newCardPopup, 'Сохранение...');
    saveCard(newCardName, newCardUrl)
        .then((data) => {
            placesList.prepend(createCard(getNewCardObject(data)));
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(newCardPopup, 'Сохранить');
        });

    newPlaceForm.reset();
    newPlaceForm.removeEventListener('submit', handleNewCardSubmit);

    clearValidation(newPlaceForm, validationConfig);
    closePopup(newCardPopup);
}


function handleAvatarSubmit(event) {
    event.preventDefault();
    const avatarLink = avatarPopup.querySelector('.popup__input_type_url').value;

    setButtonName(avatarPopup, 'Сохранение...');
    saveAvatar(avatarLink)
        .then((data) => {
            userAvatar.setAttribute('style', `background-image: url(${data.avatar})`);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setButtonName(avatarPopup, 'Сохранить');
        });

    closePopup(avatarPopup);
}


function getValidCardName(inputString) {
    if (inputString.length > 1)
        return inputString[0].toUpperCase() + inputString.slice(1).toLowerCase();

    return inputString.toUpperCase();
}


function getNewCardObject(cardItem) {
    const userId = user.id;
    const handlers = { handleLike, handleDelete, handleCardClick };
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