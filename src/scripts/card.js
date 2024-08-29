import { deleteCard, setLike, desLike } from "./api";
import { closePopup, openPopup } from "./modal";
export { createCard, handleCardLike, handleCardDelete };

const cardTemplate = document.querySelector('#card-template').content;
const deleteCardPopup = document.querySelector('.popup_type_delete-card');

function createCard(cardObject) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeCount = card.querySelector('.card__like-count');

    if (cardObject.cardItem.likes.find(item => item._id === cardObject.cardItem.owner._id)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    card.id = cardObject.cardItem._id;
    cardImage.src = cardObject.cardItem.link;
    cardImage.alt = cardObject.cardItem.name;
    cardTitle.textContent = cardObject.cardItem.name;
    cardLikeCount.textContent = cardObject.cardItem.likes.length;
    cardImage.addEventListener('click', () => {
        cardObject.handleCardImageClick(cardImage.src, cardImage.alt)
    });
    cardLikeButton.addEventListener('click', cardObject.handleCardLike);
    cardDeleteButton.addEventListener('click', cardObject.handleCardDelete);

    return card;
}

function handleCardLike(event) {
    const card = event.target.closest('.card');

    if (!event.target.classList.contains('card__like-button_is-active')) {
        setLike(card.id)
            .then((res) => {
                if (res.ok)
                    return res.json();

                return Promise.reject(error);
            })
            .then((data) => {
                card.querySelector('.card__like-count').textContent = data.likes.length;
                event.target.classList.add('card__like-button_is-active');
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        desLike(card.id)
            .then((res) => {
                if (res.ok)
                    return res.json();

                return Promise.reject(error);
            })
            .then((data) => {
                card.querySelector('.card__like-count').textContent = data.likes.length;
                event.target.classList.remove('card__like-button_is-active');
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

function handleCardDelete(event) {
    const card = event.target.closest('.card');

    deleteCardPopup.addEventListener('submit', (event) => {
        event.preventDefault();

        deleteCard(card.id)
            .then((res) => {
                if (res.ok)
                    return res.json();

                return Promise.reject(error);
            })
            .then(() => {
                card.remove();
                closePopup(deleteCardPopup);
            })
            .catch((error) => {
                console.log(error);
            })
    });

    openPopup(deleteCardPopup);
}
