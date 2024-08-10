import { open } from "./modal";
import { cardTemplate } from "./index";
export { createCard, openCard, likeCard, deleteCard };


function createCard(cardItem, deleteCard, openCard, likeCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');

    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    card.querySelector('.card__title').textContent = cardItem.name;

    card.addEventListener('click', (e) => {
        if (e.target.className === 'card__image')
            openCard(cardItem.link, cardItem.name);

        if (e.target.classList.contains('card__like-button'))
            likeCard(e);

        if (e.target.className === 'card__delete-button')
            deleteCard(card);
    });

    return card;
}

function openCard(link, name) {
    const popupImage = document.querySelector('.popup_type_image');
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__image').alt = name;
    popupImage.querySelector('.popup__caption').textContent = name;
    open(popupImage);
}

function likeCard(e) {
    e.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(card) {
    if (card)
        card.remove();
}