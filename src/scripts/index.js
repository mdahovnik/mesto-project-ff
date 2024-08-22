import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, handleCardLike, handleCardDelete } from './card';
import { openPopup, closePopup } from './modal';

const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');

document.addEventListener('click', handlePageButtons);

function handleCardClick(event) {
    if (isClicked('card__image', event))
        openPopup(getImagePopup(event));
}

function getImagePopup(event) {
    imagePopup.querySelector('.popup__image').src = event.target.src;
    imagePopup.querySelector('.popup__image').alt = event.target.alt;
    imagePopup.querySelector('.popup__caption').textContent = event.target.alt;
    return imagePopup;
}

function handlePageButtons(event) {
    if (isClicked("profile__edit-button", event)) {
        nameInput.value = content.querySelector('.profile__title').textContent;
        descriptionInput.value = content.querySelector('.profile__description').textContent;
        profilePopup.addEventListener('submit', handleProfileSubmit);
        openPopup(profilePopup);
    }

    if (isClicked('profile__add-button', event)) {
        newCardPopup.addEventListener('submit', handleNewCardSubmit);
        openPopup(newCardPopup);
    }
}

function handleProfileSubmit(event) {
    event.preventDefault();
    content.querySelector('.profile__title').textContent = nameInput.value;
    content.querySelector('.profile__description').textContent = descriptionInput.value;
    profilePopup.removeEventListener('submit', handleProfileSubmit);
    closePopup(profilePopup);
}

function handleNewCardSubmit(event) {
    event.preventDefault();

    const cardName = newCardPopup.querySelector('.popup__input_type_card-name').value;
    const newCardName = getValidCardName(cardName);
    const newCardUrl = newCardPopup.querySelector('.popup__input_type_url').value;
    const newCardObject = { name: newCardName, link: newCardUrl };

    const newCard = createCard(newCardObject, handleCardLike, handleCardDelete, handleCardClick);

    placesList.prepend(newCard);
    newCardPopup.querySelector('.popup__form').reset();
    newCardPopup.removeEventListener('submit', handleNewCardSubmit);

    closePopup(newCardPopup);
}

function isClicked(element, event) {
    return event.target.classList.contains(element);
}

function getValidCardName(inputString) {
    if (inputString.length >= 2)
        return inputString[0].toUpperCase() + inputString.slice(1).toLowerCase();

    return inputString.toUpperCase();
}

initialCards.forEach(cardItem => {
    placesList.append(createCard(cardItem, handleCardLike, handleCardDelete, handleCardClick));
});
