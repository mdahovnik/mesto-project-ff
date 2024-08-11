import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, handlerOnLike, handlerOnDelete } from './card';
import { openPopup } from './modal';

const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
export const cardTemplate = document.querySelector('#card-template').content;

document.addEventListener('click', handlerPageButtons);

export function handlerCardClicked(e) {
    if (isClicked('card__image', e))
        openPopup(getImagePopup(e));
}

function getImagePopup(e) {
    const imagePopup = document.querySelector('.popup_type_image');
    imagePopup.querySelector('.popup__image').src = e.target.src;
    imagePopup.querySelector('.popup__image').alt = e.target.alt;
    imagePopup.querySelector('.popup__caption').textContent = e.target.alt;
    return imagePopup;
}

function handlerPageButtons(e) {
    if (isClicked("profile__edit-button", e)) {
        nameInput.value = content.querySelector('.profile__title').textContent;
        descriptionInput.value = content.querySelector('.profile__description').textContent;
        profilePopup.addEventListener('submit', handlerProfileSubmit);
        openPopup(profilePopup);
    }

    if (isClicked('profile__add-button', e)) {
        newCardPopup.addEventListener('submit', handlerNewCardSubmit);
        openPopup(newCardPopup);
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
    let newCard = createCard({ name: newCardName, link: newCardUrl }, handlerOnLike, handlerOnDelete);

    placesList.prepend(newCard);
    newCardPopup.querySelector('.popup__input_type_card-name').value = '';
    newCardPopup.querySelector('.popup__input_type_url').value = '';
    newCardPopup.removeEventListener('submit', handlerNewCardSubmit);
    newCardPopup.classList.remove('popup_is-opened');
}

function isClicked(element, e) {
    return e.target.classList.contains(element);
}

initialCards.forEach(cardItem => {
    placesList.append(createCard(cardItem, handlerOnLike, handlerOnDelete));
});
