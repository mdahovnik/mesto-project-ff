import { deleteCard, setLike, desLike, getProfile } from "./api";
import { closePopup, openPopup } from "./modal";
export { createCard, handleCardLike, handleCardDelete };

const cardTemplate = document.querySelector('#card-template').content;
const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const profile = document.querySelector('.profile__info');

function createCard(cardData) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardTitle = card.querySelector('.card__title');
    const cardLikeCount = card.querySelector('.card__like-count');

    card.id = cardData.cardItem._id;
    cardImage.src = cardData.cardItem.link;
    cardImage.alt = cardData.cardItem.name;
    cardTitle.textContent = cardData.cardItem.name;
    cardLikeCount.textContent = cardData.cardItem.likes.length;
    cardImage.addEventListener('click', () => {
        cardData.handleCardImageClick(cardImage.src, cardImage.alt)
    });
    cardLikeButton.addEventListener('click', cardData.handleCardLike);
    cardDeleteButton.addEventListener('click', cardData.handleCardDelete);

    if (cardData.cardItem.likes.find(item => item._id === cardData.cardItem.owner._id)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    if (cardData.cardItem.owner._id !== profile.id) {
        cardDeleteButton.style.display = "none";
    }

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
