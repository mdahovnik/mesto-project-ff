import { deleteCard, like, dislike } from "./api";
import { closePopup, openPopup } from "./modal";
export { createCard, handleLike, handleDelete };

const cardTemplate = document.querySelector('#card-template').content;
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

function createCard(cardObject) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const image = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const title = card.querySelector('.card__title');
    const likeCount = card.querySelector('.card__like-count');

    card.id = cardObject.cardItem._id;
    image.src = cardObject.cardItem.link;
    image.alt = cardObject.cardItem.name;
    title.textContent = cardObject.cardItem.name;
    likeCount.textContent = cardObject.cardItem.likes.length;

    likeButton.addEventListener('click', cardObject.handlers.handleLike);
    deleteButton.addEventListener('click', cardObject.handlers.handleDelete);
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

function handleLike(event) {
    const card = event.target.closest('.card');
    const likeCount = card.querySelector('.card__like-count');

    if (!event.target.classList.contains('card__like-button_is-active')) {
        like(card.id)
            .then((data) => {
                likeCount.textContent = data.likes.length;
                event.target.classList.add('card__like-button_is-active');
            })
            .catch((err) => {
                console.error(err);
            })
    }
    else {
        dislike(card.id)
            .then((data) => {
                likeCount.textContent = data.likes.length;
                event.target.classList.remove('card__like-button_is-active');
            })
            .catch((err) => {
                console.error(err);
            })
    }
}

function handleDelete(event) {
    const card = event.target.closest('.card');

    deleteCardPopup.addEventListener('submit', (event) => {
        event.preventDefault();

        deleteCard(card.id)
            .then(() => {
                card.remove();
                closePopup(deleteCardPopup);
            })
            .catch((err) => {
                console.error(err);
            })
    });

    openPopup(deleteCardPopup);
}
