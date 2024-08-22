export { createCard, handleCardLike, handleCardDelete };

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardObject, onLike, onDelete, onClick) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = cardObject.link;
    cardImage.alt = cardObject.name;
    cardTitle.textContent = cardObject.name;
    card.addEventListener('click', onClick);
    cardLikeButton.addEventListener('click', onLike);
    cardDeleteButton.addEventListener('click', onDelete);

    return card;
}

function handleCardLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

function handleCardDelete(event) {
    event.target.parentElement.remove();
}