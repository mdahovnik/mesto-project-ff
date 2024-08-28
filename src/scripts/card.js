export { createCard, handleCardLike, handleCardDelete };

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardObject) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = cardObject.cardItem.link;
    cardImage.alt = cardObject.cardItem.name;
    cardTitle.textContent = cardObject.cardItem.name;
    cardImage.addEventListener('click', () => {
        cardObject.handleCardImageClick(cardImage.src, cardImage.alt)
    });
    cardLikeButton.addEventListener('click', cardObject.handleCardLike);
    cardDeleteButton.addEventListener('click', cardObject.handleCardDelete);

    return card;
}

function handleCardLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

function handleCardDelete(event) {
    event.target.parentElement.remove();
}