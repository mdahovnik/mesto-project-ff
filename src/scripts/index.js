import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, likeCard, deleteCard } from './card';
import { showPopup } from './modal';

const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
export const cardTemplate = document.querySelector('#card-template').content;

document.addEventListener('click', handlerPageButtons);

export function handlerCardClicked(e) {
    if (isClicked('card__image', e)) showPopup(initPopupImage(e));
}

function initPopupImage(e) {
    const popupImage = document.querySelector('.popup_type_image');
    popupImage.querySelector('.popup__image').src = e.target.src;
    popupImage.querySelector('.popup__image').alt = e.target.alt;
    popupImage.querySelector('.popup__caption').textContent = e.target.alt;
    return popupImage;
}

function handlerPageButtons(e) {
    if (isClicked("profile__edit-button", e)) {
        nameInput.value = content.querySelector('.profile__title').textContent;
        descriptionInput.value = content.querySelector('.profile__description').textContent;
        profilePopup.addEventListener('submit', handlerProfileSubmit);
        showPopup(profilePopup);
    }

    if (isClicked('profile__add-button', e)) {
        newCardPopup.addEventListener('submit', handlerNewCardSubmit);
        showPopup(newCardPopup);
    }
}

function handlerProfileSubmit(e) {
    e.preventDefault();
    content.querySelector('.profile__title').textContent = nameInput.value;
    content.querySelector('.profile__description').textContent = descriptionInput.value;
    profilePopup.removeEventListener('submit', handlerProfileSubmit);
    profilePopup.classList.remove('popup_is-opened');
}

function handlerNewCardSubmit(e) {
    e.preventDefault();
    let newCardName = newCardPopup.querySelector('.popup__input_type_card-name').value;
    let newCardUrl = newCardPopup.querySelector('.popup__input_type_url').value;
    placesList.prepend(createCard({ name: newCardName, link: newCardUrl }, likeCard, deleteCard));
    newCardPopup.querySelector('.popup__input_type_card-name').value = '';
    newCardPopup.querySelector('.popup__input_type_url').value = '';
    newCardPopup.removeEventListener('submit', handlerNewCardSubmit);
    newCardPopup.classList.remove('popup_is-opened');
}

export function isClicked(elementName, e) {
    return e.target.classList.contains(elementName);
}

// Вывести карточки на страницу
initialCards.forEach(cardItem => {
    placesList.append(createCard(cardItem, likeCard, deleteCard));
});
