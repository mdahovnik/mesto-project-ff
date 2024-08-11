import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, handlerOnLike, handlerOnDelete } from './card';
import { openPopup, closePopup } from './modal';

const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');
export const cardTemplate = document.querySelector('#card-template').content;

document.addEventListener('click', handlerPageButtons);

function handlerCardClicked(e) {
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
    closePopup(profilePopup);
}

function handlerNewCardSubmit(e) {
    e.preventDefault();
    const newCardName = newCardPopup.querySelector('.popup__input_type_card-name').value;
    const newCardUrl = newCardPopup.querySelector('.popup__input_type_url').value;
    const newCard = createCard({ name: newCardName, link: newCardUrl }, handlerOnLike, handlerOnDelete, handlerCardClicked);

    placesList.prepend(newCard);
    newCardPopup.querySelector('.popup__form').reset();
    newCardPopup.removeEventListener('submit', handlerNewCardSubmit);
    closePopup(newCardPopup);
}

function isClicked(element, e) {
    return e.target.classList.contains(element);
}

initialCards.forEach(cardItem => {
    placesList.append(createCard(cardItem, handlerOnLike, handlerOnDelete, handlerCardClicked));
});
