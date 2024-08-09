import '../pages/index.css';
import { initialCards } from './cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard(cardItem, deleteCard, openPopupCard, likeCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');

    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    card.querySelector('.card__title').textContent = cardItem.name;

    card.addEventListener('click', (evt) => {
        if (evt.target.className === 'card__image')
            openPopupCard(cardItem.link, cardItem.name);

        if (evt.target.classList.contains('card__like-button')) {
            likeCard(evt);
        }

        if (evt.target.className === 'card__delete-button')
            deleteCard(card);
    })

    return card;
}

function openPopupCard(link, name) {
    const popupImage = document.querySelector('.popup_type_image');
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__image').alt = name;
    popupImage.querySelector('.popup__caption').textContent = name;
    onClosePopup(popupImage);
    popupImage.classList.add('popup_is-opened');
}


function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardItem => {
    placesList.append(createCard(cardItem, deleteCard, openPopupCard, likeCard));
});



// const editButton = document.querySelector('.profile__edit-button');
// editButton.addEventListener('click', function (e) {
//     popupEdit.classList.add('popup_is-opened');
// });


// const addButton = document.querySelector('.profile__add-button');
// addButton.addEventListener('click', function(e){
//     popupNewCard.classList.add('popup_is-opened');
// })


const content = document.querySelector('.content');
content.addEventListener('click', function (evt) {
    if (evt.target.className === "profile__edit-button") {
        openPopupEdit();
    }

    if (evt.target.className === "profile__add-button") {
        openPopupNewCard();
    }
});

function openPopupEdit() {
    const popupEdit = document.querySelector('.popup_type_edit');
    onClosePopup(popupEdit);
    popupEdit.classList.add('popup_is-opened');
}

function openPopupNewCard() {
    const popupNewCard = document.querySelector('.popup_type_new-card');
    onClosePopup(popupNewCard);
    popupNewCard.classList.add('popup_is-opened');
}

function onClosePopup(popupType){
    popupType.querySelector('.popup__close').addEventListener('click', () => {
        popupType.classList.remove('popup_is-opened');
    }, { once: true });
}
