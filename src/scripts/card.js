import { cardTemplate, deleteCardPopup } from './constants';
import { like, dislike } from "./api";
import { openPopup } from "./modal";

export { createCard, handleLikeButton, handleDeleteButton, cardToDelete };

const cardToDelete = {
    get card() {
        return this._cardObject;
    },
    set card(obj) {
        this._cardObject = obj;
    }
};


function createCard(cardObject) {
    const card = cardTemplate.content.querySelector('.card').cloneNode(true);
    const image = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const title = card.querySelector('.card__title');
    const likeCount = card.querySelector('.card__like-count');

    card.dataset.cardId = cardObject.cardItem._id;
    image.src = cardObject.cardItem.link;
    image.alt = cardObject.cardItem.name;
    title.textContent = cardObject.cardItem.name;
    likeCount.textContent = cardObject.cardItem.likes.length;

    likeButton.addEventListener('click', cardObject.handlers.handleLikeButton);
    deleteButton.addEventListener('click', cardObject.handlers.handleDeleteButton);
    image.addEventListener('click', () => {
        cardObject.handlers.handleCardClick(image.src, image.alt)
    });

    // Проходим по массиву likes{...}, ищем себя по id, если есть, активируем свой лайк на карточке.
    if (cardObject.cardItem.likes.find(userLiked => userLiked._id === cardObject.userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    // Проверяем владельца карточки, если не наша, деактивируем кнопку удаления.
    if (cardObject.cardItem.owner._id !== cardObject.userId) {
        deleteButton.style.display = "none";
    }

    return card;
}


function handleLikeButton(event) {
    const card = event.target.closest('.card');
    const likeCount = card.querySelector('.card__like-count');

    if (!event.target.classList.contains('card__like-button_is-active')) {
        like(card.dataset.cardId)
            .then((data) => {
                likeCount.textContent = data.likes.length;
                event.target.classList.add('card__like-button_is-active');
            })
            .catch((err) => {
                console.error(err);
            })
    }
    else {
        dislike(card.dataset.cardId)
            .then((data) => {
                likeCount.textContent = data.likes.length;
                event.target.classList.remove('card__like-button_is-active');
            })
            .catch((err) => {
                console.error(err);
            })
    }
}


function handleDeleteButton(event) {
    cardToDelete.card = event.target.closest('.card');
    openPopup(deleteCardPopup);
}
