import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, openPopupCard, likeCard, deleteCard } from './card';
import { open } from './modal';

// DOM узлы
const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const descriptionInput = profilePopup.querySelector('.popup__input_type_description');


// Вывести карточки на страницу
initialCards.forEach(cardItem => {
    placesList.append(createCard(cardItem, deleteCard, openPopupCard, likeCard));
});

document.addEventListener('click', handlePageSectionButton);
function handlePageSectionButton(e) {
    if (e.target.className === "profile__edit-button") {
        nameInput.value = content.querySelector('.profile__title').textContent;
        descriptionInput.value = content.querySelector('.profile__description').textContent;
        open(profilePopup);
    }

    if (e.target.className === "profile__add-button")
        open(newCardPopup);
}


profilePopup.addEventListener('submit', handleProfileSubmit);
function handleProfileSubmit(e) {
    e.preventDefault();
    content.querySelector('.profile__title').textContent = nameInput.value;
    content.querySelector('.profile__description').textContent = descriptionInput.value;
    profilePopup.classList.remove('popup_is-opened');
}


newCardPopup.addEventListener('submit', handlerNewCardSubmit);
function handlerNewCardSubmit(e) {
    e.preventDefault();
    let newCardName = newCardPopup.querySelector('.popup__input_type_card-name').value;
    let newCardUrl = newCardPopup.querySelector('.popup__input_type_url').value;
    placesList.prepend(createCard({ name: newCardName, link: newCardUrl }, deleteCard, openPopupCard, likeCard));
    newCardPopup.classList.remove('popup_is-opened');
}